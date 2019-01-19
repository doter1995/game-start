import _ from 'lodash'
import './index.scss'
import ReactDOM from 'react-dom'

var element = document.createElement('div')

// 通过import导入
element.id = 'app'
document.body.appendChild(element)
ReactDOM.render('<div>aaa</div>', element)
