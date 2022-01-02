import { Component } from "react";
import "./AppImg.css";
//import aimg from "../assets/img/a.jpg"

export default class AppImg extends Component{
    state={

    }
    
    render(){
        //let a="https://img-blog.csdnimg.cn/20190412174620624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZlcnJ5c291bA==,size_16,color_FFFFFF,t_70";
        return <div>
        <img src={require("../assets/img/a.jpg").default} alt="test"></img>
        <img src="./logo512.png" alt="test"></img>
        <img src="./logo192.png" alt="test"></img>
        {/* <img src={aimg} alt="test"></img> */}
        <img src={"https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201702/14/212837wukafaa7te9rnknn.jpeg!t700x2000.jpeg"} alt="text"></img>
        </div>
    } 

}