import { Component } from "react";
import "./MaskImg.css";
//import aimg from "../assets/img/a.jpg"

export default class MaskImg extends Component{
    
    render(){
       return <img className="AppImg" src={this.props.src} alt={this.props.src} onClick={()=>this.props.onClick(this.props.src,this.props.idx)}></img>
    } 

}