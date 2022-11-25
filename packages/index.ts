import AlphaPicker from "./components/alpha/AlphaPicker.vue"
import BlockPicker from "./components/block/BlockPicker.vue"
import CardPicker from "./components/card/CardPicker.vue"
import ChromePicker from "./components/chrome/ChromePicker.vue"
import CirclePicker from "./components/circle/CirclePicker.vue"
import CompactPicker from "./components/compact/CompactPicker.vue"
import FigmaPicker from "./components/figma/FigmaPicker.vue"
import GithubPicker from "./components/github/GithubPicker.vue"
import HuePicker from "./components/hue/HuePicker.vue"
import MaterialPicker from "./components/material/MaterialPicker.vue"
import SketchPicker from "./components/sketch/SketchPicker.vue"
import SwatchesPicker from "./components/swatches/SwatchesPicker.vue"
import TwitterPicker from "./components/twitter/TwitterPicker.vue"
import {App} from "vue";

const components = [
    AlphaPicker,
    BlockPicker,
    CompactPicker,
    CirclePicker,
    ChromePicker,
    GithubPicker,
    HuePicker,
    MaterialPicker,
    SketchPicker,
    SwatchesPicker,
    TwitterPicker,
    CardPicker,
    FigmaPicker
];


const install = (app: App) => {
    components.forEach(component => {
        app.component(component.name, component);
    })
}

export {
    install,
    AlphaPicker,
    BlockPicker,
    CompactPicker,
    CirclePicker,
    ChromePicker,
    GithubPicker,
    HuePicker,
    MaterialPicker,
    CardPicker,
    FigmaPicker,
    SketchPicker,
    SwatchesPicker,
    TwitterPicker
}

