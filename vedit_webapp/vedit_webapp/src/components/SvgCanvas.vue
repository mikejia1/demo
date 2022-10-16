<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- https://www.petercollingridge.co.uk/tutorials/svg/interactive/javascript/ -->
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 60 40"
             @mousedown="startDrag"
             @mousemove="drag"
             @mouseup="endDrag">
            <rect x="0" y="0" width="30" height="20" fill="#eee" />
            <rect class="static" fill="#888" x="2" y="4" width="6" height="2" />
            <rect class="draggable" fill="#007bff" x="2" y="4" width="6" height="2" transform="rotate(90, 5, 5) translate(10, 0)" />
            <ellipse class="draggable" fill="#ff00af" cx="5" cy="5" rx="3" ry="2" transform="translate(10, 0)" />
            <polygon class="draggable" fill="#ffa500" transform="rotate(15, 15, 15)" points="16.9 15.6 17.4 18.2 15 17 12.6 18.2 13.1 15.6 11.2 13.8 13.8 13.4 15 11 16.2 13.4 18.8 13.8" />
            <path class="draggable" stroke="#2bad7b" stroke-width="0.5" fill="none" d="M1 5C5 1 5 9 9 5" transform="translate(20)" />
            <text class="draggable" x="25" y="15" text-anchor="middle" font-size="3px" alignment-baseline="middle">Drag</text>
        </svg>
    </div>
</template>

<script>
    export default {
      name: 'SvgCanvas',
      props: {
        msg: String
      }
    }

    var svg, selectedElement, offset, transform;

    function makeDraggable(evt) {
        var svg = evt.target;
        svg.addEventListener('mousedown', startDrag, false);
        svg.addEventListener('mousemove', drag, false);
        svg.addEventListener('mouseup', endDrag, false);
    }

    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }


    function startDrag(evt) {
        if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            offset = getMousePosition(evt);

            // Make sure the first transform on the element is a translate transform
            var transforms = selectedElement.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                // Create an transform that translates by (0, 0)
                var translate = svg.createSVGTransform();
                translate.setTranslate(0, 0);
                selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }

            // Get initial translation
            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }
    }

    function drag(evt) {
        if (selectedElement) {
            var coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
        }
    }

    function endDrag(evt) {
        selectedElement = false;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.static {
    cursor: not-allowed;
}

.draggable {
    cursor: move;
}
</style>
