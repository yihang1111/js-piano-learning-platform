<template>

    <div class="wall-message" >
        <p class="title">{{ menu_item[id].name }}</p>
        <p calss="slogan" style="text-align: center;">{{ menu_item[id].slogan }}</p>
        <br>


        <div class="label" :class="{ 'fixed': isNavbarFixed || wFlag || PFlag}">
            <!-- 动态类绑定时，属性名中不允许使用连字符 -。因此，在你的代码中，label-selected 应该改为 labelSelected 或者使用字符串形式的类名。 -->
            <p class="label-list" :class="{labelSelected:label_num == -1}" @click="SwitchListNode(-1)">全部</p>
            <p class="label-list" :class="{labelSelected:label_num == index}" v-for="(item,index) in label[id]" :key="index" @click="SwitchListNode(index)">{{item}}</p>
        </div>

        <!-- 利用后端处理得到的数据集cards，渲染前端 留言卡片 页面 -->
        <!-- v-if="id == 0" -->
        <div class="card" v-if="id == 0">
            <TalkCard  v-for="(item,index) in cards"  :key="index" :cards="item" @toDetail="selectCard(index)" :class="{cardSelected:index==cardSelected}"></TalkCard>
        </div>

        <div class="photo" v-if="id == 1">
            <!-- :photo="item" class="music-photo " @click="selectPhoto(index)" :class="{photoSelected:index==cardSelected}" v-for="(item,index) in cardData" :key="index"   -->
            <MusicPhoto :photo="item" class="music-photo " @toPhotoDetail="selectPhoto(index)"  v-for="(item,index) in photos" :key="index" ></MusicPhoto>
            
        </div>

        <!-- <FooterBar></FooterBar> -->

        <div class="DayToNightToDay" v-show="!PFlag">
            <div class="DayorNight">
                <!-- <span class="iconfont icon-yejianmoshi" ></span>  -->
                <div class="icon-box" @click="changeModel">
                    <span class="iconfont icon-baitianmoshi" v-show="modelFlag"></span>
                    <span class="iconfont icon-yejianmoshi" v-show="!modelFlag"></span>
                </div>
                
                <p class="CN-model">{{ model }}</p>
            </div>
        </div>
        
        <!-- 新建帖子按键 -->
        <div class="add" @click="newBlankCard" v-show="cardSelected == -1 && id == 0 && !PFlag">
            <span class="iconfont icon-jiahao"></span>
        </div>
        <!-- 新建图片按键 -->
        <div class="add" @click="newPhoto" v-show="cardSelected == -1 && id == 1 && addFlag">
            <span class="iconfont icon-jiahao"></span>
        </div>
        <!--  @changeW 的响应由子组件决定 -->
        <!-- 进入图片详情页时 导航栏固定在上方 -->
        <div class="labelfixed" v-show="wFlag">
                <!-- 动态类绑定时，属性名中不允许使用连字符 -。因此，在你的代码中，label-selected 应该改为 labelSelected 或者使用字符串形式的类名。 -->
                <p class="label-list" :class="{labelSelected:labelnum == -1}" @click="SwitchListNode(-1)">全部</p>
                <p class="label-list" :class="{labelSelected:labelnum == index}" v-for="(item,index) in label[id]" :key="index" @click="SwitchListNode(index)">{{item}}</p>
        </div>
        <PostCard :title="title" @changeW="changePostW" :wFlag="wFlag" :id="id" :label="label" :rr="rr">
            <NewCard :id="id" @newCardClose="closePostW" v-show="cardSelected == -1 && id == 0" @clickbtn="insert" ></NewCard>
            <CardDetail :id="id" v-show="cardSelected != -1 && wFlag " :cards="cards[cardSelected]" ></CardDetail>
        </PostCard>

        <!-- @changePFlag="changePFlag" -->
        <PhotoView @changePFlag="changePFlag" v-show="id == 1 && PFlag" :id="id" :label="label">
            <PhotoDetail :id="id" :np="np" v-if="!np" :photo="photos[photoSelected1]"></PhotoDetail>
            <PhotoDetail2 :id="id" :np="np" v-if="np" :photo="photos[photoSelected1]"></PhotoDetail2>
            <PostPhoto :np="np" :photo="photos[photoSelected1]" @closePW="closePW" >
                <PhotoComment :id="id" :np="np" :photo1="photos[photoSelected1]" @clickbt="insertPhoto"></PhotoComment>
            </PostPhoto>
        </PhotoView>

    </div>
</template>
<script >
import {menu_item,label} from '@/utils/data'
import TalkCard from '@/components/TalkCard.vue'
import PostCard from '@/components/PostCard.vue'
// import FooterBar from '@/components/FooterBar.vue'
import NewCard from '@/components/NewCard.vue'
import CardDetail from '@/components/CardDetail.vue'
import MusicPhoto from '@/components/MusicPhoto.vue'
import PhotoView from '@/components/PhotoView.vue'
import PhotoDetail from '@/components/PhotoDetail.vue'
import PhotoDetail2 from '@/components/PhotoDetail2.vue'
import PostPhoto from '@/components/PostPhoto.vue'
// import NewPhoto from '@/components/NewPhoto.vue'

import PhotoComment from '@/components/PhotoComment.vue'

import {findWallPageApi,findPhotoPageApi} from '@/api/index'

import {talk, photo} from '../../mock/index'

// import { inject } from 'vue'

export default{
    data(){
        return{
            menu_item,
            // 论坛下的导航栏
            label,
            // 控制导航栏是否固定
            isNavbarFixed: false,

            // label_num用于表示不同列表项被选中 -1代表 全部 被选中
            label_num : -1,

            // 拿到假数据
            photo:photo.data,
            talk:talk.data,
            // photos:photos.data,

            // 控制昼夜
            modelFlag:false,
            model:'夜间',

            // 控制label是否固定
            labelFlag: true,

            // title 新建标题
            title:'发表新帖',

            // rr
            rr:false,
            np:false,

            // wFlag 发帖窗口是否显示在界面
            wFlag:false,

            // 图片详情
            PFlag: false,

            // addFlag
            addFlag: true,

            // 当前点击的卡片的index
            cardSelected: -1,

            // 当前点击的图片的index
            photoSelected: -1,

            // 帖子真数据
            cards:[],

            photos:[],

            // 
            page: 1,
            pagesize:100,

            showComponent: false
        }
    },

    mounted() {
        
        // 监听滚动事件
        window.addEventListener('scroll', this.handleScroll);

        // 处理游客的唯一标识userId 即ip地址
        this.getUser()

    },
    beforeUnmount() {
        // 清除监听器
        // window.removeEventListener('scroll', this.handleScroll);
    },
    components:{
        TalkCard,
        PostCard,
        // FooterBar,s
        NewCard,
        CardDetail,
        MusicPhoto,
        PhotoView,
        PhotoDetail,
        PostPhoto,
        PhotoComment,
        PhotoDetail2,
    },
    computed:{
        // id用于切换不同主菜单项的内容
        id(){
            return this.$route.query.id;
        },
        
        cardData(){
            let a = ''
            if(this.$route.query.id == 0){
                a = talk.data
            }else if(this.$route.query.id == 1){
                a = photo.data
            }
            return a
        },

        user(){
            return this.$store.state.user
        },
        photoSelected1(){
            if(this.photoSelected == -1){
                return 0
            }else{
                return this.photoSelected
            }  
        },

    },
    methods:{

        
        // 点击论坛下的子导航栏 切换对应列表项 展示相应的内容
        SwitchListNode(index){
            this.label_num = index

            // 点击切换论坛下子导航 详情页模态框应处于非弹出状态
            this.wFlag = false
            this.PFlag = false
            this.cardSelected = -1
            this.photoSelected = -1

            // 清空当前页面渲染的数据
            this.cards = []
            this.photos = []
            // page表示无限列表的第几页
            this.page = 1

            this.getPostCard(this.id)
            this.getPhoto(this.id)
        },

        // 切换昼夜
        changeModel(){
            this.modelFlag = ! this.modelFlag
            if(this.modelFlag){
                this.model = '白天'
            }else{
                this.model = '夜间'
            }
        },

        // 点击cha 关闭图片详情
        changePFlag(){
            this.PFlag = false 
            this.np = false
        }, 

        // 实现监控导航栏位置
        handleScroll() {
            const labelElement = document.querySelector('.label');

            // 检查是否成功找到了元素
            if (labelElement) {

                const navbarOffsetTop = labelElement.offsetTop;

                // 获取当前滚动位置
                const scrollPosition = window.scrollY;

                // 如果滚动位置超过了导航栏初始位置，则固定导航栏
                console.log(this.labelFlag,(scrollPosition - navbarOffsetTop));
                if( this.labelFlag && (scrollPosition - navbarOffsetTop) > -60 ){
                    this.isNavbarFixed = true
                    this.labelFlag = !this.labelFlag
                }else if(!this.labelFlag && (scrollPosition - navbarOffsetTop) < 20){
                    this.isNavbarFixed = false
                    this.labelFlag = !this.labelFlag
                }
            }else {
                // 如果未找到元素，进行错误处理
                console.error('未找到具有 .label 类名的元素');
            }
        },

        // // 点击新建空白 详情/发帖 模态框
        newBlankCard(){
            this.title = '发表新帖';
            this.rr = false;
            // this.changePostW();
            this.wFlag = !this.wFlag;      
        },
        newPhoto(){
            this.np = true;
            this.PFlag = true
            this.addFlag = false
            // console.log(this.np);
        },

        //点击cha 改变发帖窗口的显示状态
        changePostW(value){
            this.wFlag = !this.wFlag;
            this.cardSelected = value;
        },

        //点击取消按钮 关闭 模态框
        closePostW(){
            this.wFlag = false;
        },

        // 选择卡片
        selectCard(e){

            this.title = '';
            this.rr = true;
            if(this.cardSelected != e){
                this.cardSelected = e;
                this.wFlag = true;
            }else{
                this.cardSelected = -1;
                this.wFlag = false;
            } 
        },
        // 选择图片
        selectPhoto(e){
            if(this.photoSelected != e){
                this.photoSelected = e;
                // console.log(this.photoSelected);
                this.PFlag = true;
                this.np = false
                this.addFlag = false
            }else{
                this.photoSelected = -1;
                this.PFlag = false;
                this.addFlag = true
            } 
        },
        // 关闭图片详情窗口
        closePW(){
            this.PFlag = false
            this.addFlag = true
            this.photoSelected = -1
            
        },

        // 插入新贴
        insert(newdata){
            this.cards.unshift(newdata)
            this.changePostW()
            setTimeout(() => {
                alert('发布成功');
            }, 800)
        },

        // 插入新图片
        insertPhoto(photoData){
            setTimeout(() => {
                this.photos.unshift(photoData)
                console.log(photoData);
                this.PFlag = false;
                this.addFlag = true;
            }, 800)
        },
    
        getUser(){
            let timer = setInterval(() => {
                
                if(this.user){
                    
                    clearInterval(timer)
                    
                    this.getPostCard(this.id)
                    this.getPhoto(this.id)
                }
            }, 10)
        },
        // 为数据库中的留言帖子表的所有属性赋初值，并经由后端处理，形成新的数据集cards，再由前端渲染到页面
        getPostCard(id){
            let data
            if(this.page > 0){
                data = {
                    type: id,
                    page: this.page,
                    pagesize: this.pagesize,
                    userId: this.user.id,
                    label: this.label_num
                }
                // console.log(data);
                findWallPageApi(data).then((res) => {
                    this.cards = this.cards.concat(res.message)
                    // console.log(res.message);

                    if(res.message.length){
                        this.page++
                    }else{
                        this.page = 0
                    }
                })
            }
        },
        // 为数据库中的留言帖子表的所有属性赋初值，并经由后端处理，形成新的数据集cards，再由前端渲染到页面
        getPhoto(id){
            let data
            if(this.page > 0){
                data = {
                    type: id,
                    page: this.page,
                    pagesize: this.pagesize,
                    userId: this.user.id,
                    label: this.label_num
                }
                // console.log(data);
                
                findPhotoPageApi(data).then((res) => {
                    this.photos = this.photos.concat(res.message)
                    // console.log(res.message);

                    if(res.message.length){
                        this.page++
                    }else{
                        this.page = 0
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/fonts/icon-yejianmoshi/iconfont.css';
@import '../assets/fonts/icon-baitianmoshi/iconfont.css';
@import '../assets/fonts/icon-jiahao/iconfont.css';
.wall-message{
    min-height: 700px;
    padding-top: 60px;
    .title{
        padding-top: 20px;
        padding-bottom: 8px;
        font-size: 35px;
        color: #202020;
        text-align: center;
        font-weight: 600;
    }
    .slogan{
        color: @gray-2;
    }

    .fixed {
        position: fixed;
        top:60px;
        z-index: 99999;
        margin-top: 0;
    }


    .label{
        background-color: @gray-10;
        box-shadow: 0 0 1px 1px #f8f8f8;
        width:100%;
        transition: @slow-trans;

        display: flex;
        justify-content: flex-start;
        padding-left: 40px;


        .label-list{
            padding: 0 14px;
            line-height: 28px;
            margin: 4px;
            color: @gray-2;
            
            // 改变鼠标样式
            cursor:pointer;
        }
        .labelSelected{
            color: @gray-1;
            font-weight: 600;
            border: 1px solid @gray-1;
            border-radius: 14px;
        }

        
    }

    .card{
        // border: 1px solid red;
        // height: 10000px;
        .cardSelected{
            border: 1px solid @primary-color;
        }
        z-index: 2;
    }
    
    .DayToNightToDay{
        z-index: 2000;
        width: 52px;
        height: 80px;
        background-color: @gray-10;
        // border: 1px solid @gray-1;
        box-shadow: 0 0 5px 5px #f8f8f8;
        border-radius: 14px;
        position: fixed;
        right: 70px;
        top: 230px;
        .DayorNight{
           position: relative;
           top:20px;
           left:12px;
           .icon-box{
                width: 28px;
                height: 28px;
                cursor:pointer;
                // position: relative; 
                transition: @trans;
                &:hover{
                    background-color: #f0f0f0;
                }
                .iconfont{
                    position: relative;
                    top:3px;
                    left:6px;
                }
           }
           
           .CN-model{
                top:2px;
                position: relative;
                left: 3px;
                font-size: 12px;
           }
           
        }
    }

    .add{
        z-index: 2000;
        width: 56px;
        height: 56px;
        position: fixed;
        right: 70px;
        top: 450px;
        background: @gray-1;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.08);
        border-radius: 28px;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor:pointer;

        .icon-jiahao{
            color:@gray-10;
            font-size: 24px;
        }
    }

    .photo{
        width: 85%;
        display: flex;
        flex-wrap:wrap;
        margin-left:40px;
        
        z-index: 1;

        .music-photo{
            width: 300px;
            
            margin-left: 15px;
            margin-right: 15px;
            margin-top:20px;
            margin-bottom:20px;
            
        }
        
    }

    

    .photoSelected{
        border: 3px solid black;
    }
}
</style>
