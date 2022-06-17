import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Card url="/dir.png" title="test测试" media="img"></Card>
       <Card
        url="/video1.mp4"
        title="视频测试"
        media="video"
      ></Card>
      <Card url="/dir.png" title="test测试" media="img"></Card>
      <Card url="/dir.png" title="test测试" media="img"></Card>
      <Card url="/dir.png" title="test测试" media="img"></Card>
    </div>
  );
}

function Card(props) {
  return (
    <div>
      <div>{props.title}</div>
      {props.media === "video" ? (
        <VideoCard url={props.url} />
      ) : (
        <ImgCard url={props.url} />
      )}
    </div>
  );
}

function VideoCard(props) {
  const [imgurl, setImgurl] = useState();
  getVideoBase64(props.url).then((data) => setImgurl(data));
  return (
    <div>
      <img src={imgurl}></img>
    </div>
  );
}

function ImgCard(props) {
  return (
    <div>
      <img src={props.url}></img>
    </div>
  );
}

//将图片生成base64
function getImgBase64(url) {
  return new Promise(function (resolve, reject) {
    let Img = new Image();
    let dataURL = "";
    Img.src = url;
    Img.onload = function () {
      //确保图片完整获取
      var canvas = document.createElement("canvas"), //创建canvas元素
        width = Img.width, //canvas的尺寸和图片一样
        height = Img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
      resolve(dataURL);
    };
  });
}

//获取视频的第一帧图片
function getVideoBase64(url) {
  return new Promise(function (resolve, reject) {
    let dataURL = "";
    let video = document.createElement("video");
    video.setAttribute("crossOrigin", "anonymous"); //处理跨域
    video.setAttribute("src", url);
    video.setAttribute("width", 400);
    video.setAttribute("height", 240);
    video.setAttribute("preload", "auto");
    video.addEventListener("loadeddata", function () {
      let canvas = document.createElement("canvas"),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
      resolve(dataURL);
    });
  });
}
