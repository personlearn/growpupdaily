import { Component } from "react";
import InputRadio from "./InputRadio"
import "./Tagform.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css";

export default class Tagform extends Component {

    constructor(props) {
        super(props);
        this.state = {
            IsAddmask: false,
            IsContentMask: "block",
            newtag: undefined,
            tags: [],
            phototags: props.tags,
            photoid: props.photoid
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBoxChange = this.handleBoxChange.bind(this);
        console.log(props);
    }

    async componentDidMount() {
        await this.getTagsByUserid();
    }

    async componentWillReceiveProps(nextprops) {
        this.setState({
            phototags: nextprops.tags,
            photoid: nextprops.photoid
        })
        console.log('componentWillReceiveProps')
        console.log(nextprops)
        if(nextprops.photoid){
            await this.getPhotoById(nextprops.photoid);
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    async getTagsByUserid() {
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
                    tags: res.data ? res.data.tags : []
                });
                console.log(res);
            });
    }

    async getPhotoById(photoid) {
        await fetch('http://192.168.31.248:50011/photo/getPhotoById',
            {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    userid: '44275978c89511ec89b5685d43b14891',
                    photoid: photoid
                }),
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    phototags: res.data && res.data.tagid ?res.data.tagid: []
                });
                console.log(res);
            });
    }

    handleChange(event) {
        this.setState({ newtag: event.target.value })
    }

    async sumbit(event) {
        this.setState({ tags: [...this.state.tags, this.state.newtag], IsAddmask: false, IsContentMask: "block" })
        console.log(this.state);

        await fetch('http://192.168.31.248:50011/photo/addTagsByUserId',
            {
                method: "POST",
                body: "userid=44275978c89511ec89b5685d43b14891&tagname=" + this.state.newtag,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                // this.setState({
                //     tags: res.data?res.data.tags:[]
                // });
                console.log(res);
            });
    }

    AddNewTag() {
        this.setState({ IsAddmask: true, IsContentMask: "none" });
        console.log(this.state);
    }

    async handleBoxChange(event) {
        console.log("handleBoxChange");
        console.log(event);
        var phototags = [];
        if (event.target.checked) {
            phototags = [...this.state.phototags, event.target.defaultValue]
        }
        else {
            phototags = this.state.phototags.filter((item) => { return item !== event.target.value })
        }

        await fetch('http://192.168.31.248:50011/photo/addPhotoByTag',
            {
                method: "POST",
                body: JSON.stringify({
                    userid: '44275978c89511ec89b5685d43b14891',
                    tags: phototags,
                    photoid: this.state.photoid
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                cache: 'default'
            }).then(res => res.json())
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        phototags: phototags
                    })
                }
                else {
                    event.target.checked = !event.target.checked
                }
                console.log(res);
            });
    }

    render() {
        return <div className={this.props.IsTagmask ? "tagform" : "untagform"}>
            <div className={this.state.IsAddmask ? "addtag" : "unaddtag"}>
                <div className="newtag">
                    <input name="newtag" type="text" value={this.state.newtag} onChange={this.handleChange} placeholder="请输入新标签"></input>
                    <button onClick={() => this.sumbit()}>确认</button>
                    <button onClick={() => this.sumbit()}>取消</button>
                </div>
            </div>
            <div className="tagcontent" style={{ display: this.state.IsContentMask }}>
                <div className="tagclose" onClick={() => this.props.onClick()}><i class="fa fa-times" aria-hidden="true"></i></div>
                <div className="">请选择标签
                    <button onClick={() => this.AddNewTag()}>添加新的标签</button>
                </div>
                {
                    this.state.tags.map(x => {
                        return <InputRadio name={x} val={x} tags={this.state.phototags} onChange={this.handleBoxChange}></InputRadio>
                    })
                }
            </div>
            <div ></div>
        </div>
    }

}