<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <!-- https://www.petercollingridge.co.uk/tutorials/svg/interactive/javascript/ -->
        <div style="border-style:solid">
            <input type="file" ref="doc" @change="readFile()" />
            <div>{{content}}</div>
        </div>
        <!--does this canvas need to be an svg? -->
        <svg xmlns="http://www.w3.org/2000/svg"
             id="canvas"
             viewBox="0 0 60 40"
             @load="makeDraggable">
            <svg xmlns="http://www.w3.org/2000/svg" v-for="(svg, index) in svgFiles" v-bind:key="index" v-html="svg"/>
            <rect class="draggable"
                  fill="#b17bff" x="4" y="1" width="3" height="3" transform="translate(10, 0)" />
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'SvgCanvas',
        props: {
            msg: String
        },
        data: () => ({ file: null, content: null, tempSvg: null, svgFiles: [],}),
        methods: {
            //https://masteringjs.io/tutorials/vue/file
            readFile() {
                this.file = this.$refs.doc.files[0];
                const reader = new FileReader();
                if (this.file.name.includes(".svg")) {
                    this.content = "check the console for file output";
                    reader.onload = (res) => {
                        this.tempSvg = res.target.result;
                        this.svgFiles.push(this.tempSvg);
                        console.log(this.svgFiles);
                    };
                    reader.onerror = (err) => console.log(err);
                    reader.readAsText(this.file);
                } else {
                    this.content = "please select an svg file";
                }
            },

            makeDraggable(evt) {
                //this.readFile();
                var svg = evt.target;
                console.log(svg + "makeDraggable");
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
                    console.log(selectedElement + "selectedElement");
                    console.log(selectedElement + "offset");
                    selectedElement = evt.target;
                    console.log(selectedElement + "startDrag");
                    offset = getMousePosition(evt);
                    // Make sure the first transform on the element is a translate transform
                    var transforms = selectedElement.transform.baseVal;
                    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                        // Create an transform that translates by (0, 0)
                        var translate = svg.createSVGTransform();
                        translate.setTranslate(0, 0);
                        // This will insert the translate as the first element of the transform. Transforms are just applied from right to left.
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
                    transform = false;
                    offset = false;
                }

            },


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
