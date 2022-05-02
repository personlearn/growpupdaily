import { Component } from "react";
import Img from "../Components/AppImg";
import "./menu1.css"
import "./mask.css"
import Tagform from "../Components/Tagform";

export default class menu1 extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            largesrc: null,
            IsMask: false,
            photoid: null,
            curidx: 0,
            curtag: this.props.match.params.tagid,
            IsTagmask: false,
            phototags: [],
            list: [
            ],
            originlist: [
                // { src: require("../assets/img/SlamDunk_23_001.jpg").default, tag: ["test", "ceshi"] },
                // { src: require("../assets/img/SlamDunk_23_008.jpg").default, tag: ["ceshi"] },
                // { src: require("../assets/img/SlamDunk_23_009.jpg").default, tag: ["test"] },
            ],
        }
    }

    async componentDidUpdate() {
        console.log(this.state)
    }

    async componentDidMount() {
        await this.getphotos(this.state.curtag);
        // console.log("componentDidMount");
        // console.log(this.state);
        // let datatag = this.state.curtag === "all" ? this.state.originlist : this.state.originlist.filter((item) => item.tag.includes(this.state.curtag));
        // console.log(datatag);
        // this.setState({ list: datatag });
    }

    async getphotos(tagid) {
        if (tagid === "_all") {
            await fetch('http://192.168.31.248:50011/photo/getAllPhoto?userid=44275978c89511ec89b5685d43b14891',
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
                        list: res.data
                    });
                    console.log(res);
                });
        }
        else {
            await fetch('http://192.168.31.248:50011/photo/getPhotoByTag',
                {
                    method: "POST",
                    body: JSON.stringify({
                        userid: '44275978c89511ec89b5685d43b14891',
                        tagid: tagid
                    }),
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    cache: 'default'
                }).then(res => res.json())
                .then(res => {
                    this.setState({
                        list: res.data
                    });
                    console.log(res);
                });
        }
    }

    clicklarge(e) {
        this.setState({
            largesrc: e.src,
            IsMask: true,
            curidx: e.idx,
            photoid: e.photoid,
            phototags: this.state.list[this.state.curidx].tagid ? this.state.list[this.state.curidx].tagid : []
        });
        console.log(this.state);
        console.log(e)
    }

    ClickNormal() {
        this.setState({
            largesrc: null,
            IsMask: false,
            photoid: null,
            phototags: []
        });
        console.log(this.state);
    }

    ClickNext() {
        console.log(this.state);
        if (this.state.curidx < this.state.list.length - 1) {
            this.setState({
                largesrc: this.state.list[this.state.curidx + 1].photosrc,
                IsMask: true,
                curidx: this.state.curidx + 1,
                photoid: this.state.list[this.state.curidx + 1]._id,
                phototags: this.state.list[this.state.curidx + 1].tagid ? this.state.list[this.state.curidx + 1].tagid : []
            });
        }
        else {
            alert("已经是最后一页了")
        }
        console.log(this.state);
    }

    ClickPrevious() {
        console.log(this.state);
        if (this.state.curidx > 0) {
            this.setState({
                largesrc: this.state.list[this.state.curidx - 1].photosrc,
                IsMask: true,
                curidx: this.state.curidx - 1,
                photoid: this.state.list[this.state.curidx - 1]._id,
                phototags: this.state.list[this.state.curidx - 1].tagid ? this.state.list[this.state.curidx - 1].tagid : []
            });
        }
        else {
            alert("已经是第一页了")
        }
        console.log(this.state);
    }

    ClickCategory() {
        this.setState(
            {
                IsTagmask: true,
            });
        console.log(this.state);
    }

    CloseTag(){
        this.setState(
            {
                IsTagmask: false,
            });
        console.log(this.state);
    }

    render() {
        return <div className="ImgCollect">
            <div className={this.state.IsMask ? "mask" : "unmask"}>
                <div>
                    {this.props.location.state}
                </div>
                <div className="maskContent" onClick={() => this.ClickNormal()}>
                    <img className="maskPhoto" src={this.state.largesrc} alt={this.state.largesrc}></img>
                </div>
                <div className="category" onClick={() => this.ClickCategory()}>分类</div>
                <Tagform photoid={this.state.photoid} IsTagmask={this.state.IsTagmask} tags={this.state.phototags} onClick={() => this.CloseTag()} />
                <div className="pageIndex">
                    <div className="previousPage" onClick={() => this.ClickPrevious()}>上一页</div>
                    <div className="NextPage" onClick={() => this.ClickNext()}>下一页</div>
                </div>
            </div>
            <div>
                {
                    this.state.list.map((item, idx) => {
                        return (
                            <Img idx={idx} className="photo" photoid={item._id} src={item.photosrc} onClick={(e) => this.clicklarge(e)}></Img>
                        );
                    })
                }
            </div>
        </div>
    }
}