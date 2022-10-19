<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- https://www.petercollingridge.co.uk/tutorials/svg/interactive/javascript/ -->
        <svg xmlns="http://www.w3.org/2000/svg"
             id="canvas"
             viewBox="0 0 60 40"
             @load="makeDraggable"
             >
            <svg xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="30" height="20" fill="#eee" />
                <text class="draggable" x="25" y="15" text-anchor="middle" font-size="3px" alignment-baseline="middle">Drag</text>
            </svg>
            <rect class="draggable" 
                  fill="#007bff" x="2" y="4" width="6" height="2" transform="rotate(90, 5, 5) translate(10, 0)" />
            <ellipse class="draggable" fill="#ff00af" cx="5" cy="5" rx="3" ry="2" transform="translate(10, 0)" />
            <polygon class="draggable" fill="#ffa500" transform="rotate(15, 15, 15)" points="16.9 15.6 17.4 18.2 15 17 12.6 18.2 13.1 15.6 11.2 13.8 13.8 13.4 15 11 16.2 13.4 18.8 13.8" />
            <path class="draggable" stroke="#2bad7b" stroke-width="0.5" fill="none" d="M1 5C5 1 5 9 9 5" transform="translate(20)" />
            
        </svg>
    </div>
</template>

<script>
    export default {
      name: 'SvgCanvas',
      props: {
        msg: String
        },
      methods: {
          makeDraggable(evt) {
              var svg = evt.target;
              svg.addEventListener('mousedown', startDrag);
              svg.addEventListener('mousemove', drag);
              svg.addEventListener('mouseup', endDrag);
              svg.addEventListener('mouseleave', endDrag);
              function getMousePosition(evt) {
                  var CTM = svg.getScreenCTM();
                  if (evt.touches) { evt = evt.touches[0]; }
                  return {
                      x: (evt.clientX - CTM.e) / CTM.a,
                      y: (evt.clientY - CTM.f) / CTM.d
                  };
              }
              var selectedElement, offset, transform;
              function startDrag(evt) {
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
              function drag(evt) {
                  if (selectedElement) {
                      evt.preventDefault();
                      var coord = getMousePosition(evt);
                      transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
                  }
              }
              function endDrag() {
                  selectedElement = false;
              }
          }

      },
       
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

.draggable {
    cursor: move;
}
</style>
