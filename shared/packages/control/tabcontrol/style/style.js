import styled from 'styled-components'
import { styled as tabtabStyle } from 'alpaca-react-tabtab'
let { TabListStyle, ActionButtonStyle, TabStyle, PanelStyle } = tabtabStyle;

TabListStyle = styled(TabListStyle)`
  background: #777879;
  margin-top: 4px;
`;

TabStyle = styled(TabStyle)`display: inline-flex; justify-content: space-between; padding: 0 15px 0 10px; background-color: ${props => props.active ? '#F4F6F8' : '#777879'};
  color: ${props => props.active ? '#434547' : 'white'}; min-width: 150px; min-height: 36px; max-height: 36px; line-height: 36px;
  button {display: inline-flex; align-items: center; background-color: transparent;
    &:hover {background-color: transparent;}
  }
  &:first-child {min-width: 64px; padding: 0; justify-content: center;}
  .fal {font-size: 22px; color: white; vertical-align: -3px;}
   &[aria-selected="true"] {
    .fal {color: #434547;}
  }
   &[aria-selected="false"] {
    svg {fill: white;}
    &:hover {color: white;}
  }
  ${props => props.vertical ?
    `
      // border-top: 1px solid transparent;
      // border-bottom: 1px solid #efefef;
      // border-left: 1px solid #efefef;
      // border-right: 1px solid #efefef;
      // border-radius: 0;
      // &:first-child {
      //   border-top: 1px solid #efefef;        
      // }
    `
    : `
      // &:hover {
      //   border-color: #ddd #ddd #fff;
      //   background: #ddd;
      //   color: #007bff;
      // }
  `}
  ${props => props.active && props.vertical ?
    `
      // background-color: #eee;
    `
    : null}
  ${props => props.active && !props.vertical ?
    `
      // border-color: #ddd #ddd #fff;
    `
    : null}
`;

ActionButtonStyle = styled(ActionButtonStyle)`
  // null
`;

PanelStyle = styled(PanelStyle)`
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  border-radius: 2px;
  padding: 0;
`;

module.exports = {
  TabList: TabListStyle,
  ActionButton: ActionButtonStyle,
  Tab: TabStyle,
  Panel: PanelStyle
}
