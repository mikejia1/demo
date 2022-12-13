<template lang="pug">
<div ref='canvas' width="100"></div>
</template>

<script>
    // import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
    import * as THREE from 'three'
    import TrackballControls from 'three-trackballcontrols'

    export default {
        name: 'TheCanvas',
        data: function () {

            return {
                speed: 0.01
            }
        },
        created: function () {
            this.scene = new THREE.Scene()
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
            const amblight = new THREE.AmbientLight(0x404040); // soft white light
            const geometry = new THREE.BoxGeometry(1, 1, 1)
            /*
            const material = new THREE.MeshStandardMaterial({
                side: THREE.FrontSide,
                color: 'hsl(0, 100%, 50%)',
                wireframe: false
            })
            */
            var loader = new THREE.TextureLoader();

            //convert svg to png https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
            const svg = '<svg xmlns="http://www.w3.org/2000/svg">< path class="draggable" stroke = "#2bad7b" stroke - width="0.5" fill = "none" d = "M1 5C5 1 5 9 9 5" transform = "translate(20)" /> </svg >'
            this.svgToPng(svg, (imgData) => {
                console.log("finished processing image!");
                console.log(imgData);
            })
            console.log(require("../assets/gorrila.png"))
            const textureImage = require("../assets/gorrila.png")

            var mats = [
            textureImage,
            textureImage,
            textureImage,
            textureImage,
            textureImage,
            textureImage,
        ].map(pic => {
            return new THREE.MeshLambertMaterial({ map: loader.load(pic) });
        });
        this.cube = new THREE.Mesh(geometry, mats);
        this.axes = new THREE.AxesHelper(5)
            this.scene.add(this.camera)
            this.scene.add(this.light)
            this.scene.add(amblight)
            this.scene.add(this.cube)
            this.scene.add(this.axes)
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.light.position.set(0, 0, 10)
            this.camera.position.z = 5
            this.scene.background = new THREE.Color('hsl(0, 100%, 100%)')
    },
        mounted: function () {
        this.$refs.canvas.appendChild(this.renderer.domElement)
        this.controls = new TrackballControls(this.camera, this.renderer.domElement)
        this.controls.rotateSpeed = 5
        this.controls.zoomSpeed = 5
        this.controls.panSpeed = 0.8
        this.controls.noZoom = false
        this.controls.noPan = false
        this.controls.staticMoving = true
        this.controls.dynamicDampingFactor = 0.3
        this.animate()
    },
    methods: {
        animate: function () {
            requestAnimationFrame(this.animate)
            this.renderer.render(this.scene, this.camera)
            this.cube.rotation.y += this.speed
            this.controls.update()
        },


        svgToPng: function (svg, callback) {
            console.log("svgToPng");
            const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
            this.svgUrlToPng(url, (imgData) => {
                console.log("svgToPng callback");
                callback(imgData);
                URL.revokeObjectURL(url);
            });
        },

        svgUrlToPng: function (svgUrl, callback) {
            console.log("svgUrlToPng");
            const svgImage = document.createElement('img');
            svgImage.onload = () => {
                console.log("svgImage.onload");
                const svgcanvas = document.createElement('preview');
                svgcanvas.width = svgImage.clientWidth;
                svgcanvas.height = svgImage.clientHeight;
                const svgcanvasCtx = svgcanvas.getContext('2d');
                svgcanvasCtx.drawImage(svgImage, 0, 0);
                const imgData = svgcanvas.toDataURL('image/png');
                callback(imgData);
                document.body.removeChild('preview');
            };
            svgImage.src = svgUrl;
            document.body.appendChild(svgImage);

        },
    },
    computed: {
        rotate: function () {
            if (this.speed === '') {
                return 0
            } else {
                return this.speed
            }
        }
    }

    }
</script>