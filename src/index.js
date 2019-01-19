import _ from 'lodash'
import './index.scss'

function component() {
  var element = document.createElement('div')

  // 通过import导入
  element.innerHTML = _.join(['Hello', 'webpack!!!!'], ' ')
  element.classList.add('hello')
  console.error('aaa')
  return element
}

document.body.appendChild(component())
