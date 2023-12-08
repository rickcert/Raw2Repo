import {createApp} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import {ElAvatar, ElButton, ElProgress, ElRate} from "element-plus";

const app = createApp(App)
app.use(ElAvatar)
app.use(ElButton)
app.use(ElRate)
app.use(ElProgress)
app.mount(document.querySelector('#app'))

