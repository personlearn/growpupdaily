import { Component } from "react";
import Dir from "../Components/Dir"
import "./Imglist.css"

export default class Imglist extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[]
        }
    }

    async componentDidMount(){
        await fetch('http://192.168.31.248:50011/photo/getTagsByUserId?userid=44275978c89511ec89b5685d43b14891',
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                this.setState({

                    tags: res.data?res.data.tags:[]
                });
                console.log(res);
            });
    }

    OpenDir(tagid){
        const{history} =this.props
        console.log(history);
        history.push("/menu1/"+tagid)
    }

    render(){
        return <div className="Imglist">
            <Dir tagid="_all" tagname="全部" onClick={tagid=>this.OpenDir("_all")}></Dir>
            {
                this.state.tags.map((item,idx)=>{
                    return <Dir tagid={item} tagname={item} onClick={tagid=>this.OpenDir(item)}></Dir>
                })
            }
        </div>
    }
}