// import AlphaPicker from "./components/alpha/AlphaPicker.vue"
import BlockPicker from "./components/block/BlockPicker.vue"
// import ChromePicker from "./components/chrome/ChromePicker.vue"
// import CirclePicker from "./components/circle/CirclePicker.vue"
// import CompactPicker from "./components/compact/CompactPicker.vue"
// import GithubPicker from "./components/github/GithubPicker.vue"
// import HuePicker from "./components/hue/HuePicker.vue"
// import MaterialPicker from "./components/material/MaterialPicker.vue"
// import PhotoshopPicker from "./components/photoshop/PhotoshopPicker.vue"
// import SketchPicker from "./components/sketch/SketchPicker.vue"
// import SliderPicker from "./components/slider/SliderPicker.vue"
// import SwatchesPicker from "./components/swatches/SwatchesPicker.vue"
import TwitterPicker from "./components/twitter/TwitterPicker.vue"
import {App} from "vue";

const components = [
    // AlphaPicker,
    BlockPicker,
    // CompactPicker,
    // CirclePicker,
    // ChromePicker,
    // GithubPicker,
    // HuePicker,
    // MaterialPicker,
    // PhotoshopPicker,
    // SliderPicker,
    // SketchPicker,
    // SwatchesPicker,
    TwitterPicker
];


const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component);
    })
}

export {
    install,
    // AlphaPicker,
    BlockPicker,
    // CompactPicker,
    // CirclePicker,
    // ChromePicker,
    // GithubPicker,
    // HuePicker,
    // MaterialPicker,
    // PhotoshopPicker,
    // SliderPicker,
    // SketchPicker,
    // SwatchesPicker,
    TwitterPicker
}

