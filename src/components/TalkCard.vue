<template>
    <div class="knowledge-card" style="background:white " >
        <div class="top">
            <p class="time">{{switchdate(card.moment)}}</p>
            <p class="label" >{{ label[idFlag][card.label] }}</p>
            <!-- <p class="label" v-show="idFlag == 0">{{ label[1][card.label] }}</p> -->
        </div>
        <p class="message" @click="toDetail">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon" @click="clickLike">
                    <span class="iconfont icon-xin" :class="{islike:card.islike[0].count > 0}"></span>
                    <span class="value">{{ card.like[0].count }}</span>
                </div>
                
                <div class="icon" v-show="card.comcount[0].count > 0">
                    <span class="iconfont icon-pinglun"></span>
                    <span class="value">{{ card.comcount[0].count }}</span>
                </div>

            </div>
            <div class="name">用户名</div>
        </div>
    </div>
</template>
<script >
import {label} from '@/utils/data'
import {switchdate} from '@/utils/switchTime'
import {insertFeedback} from '@/api/index'
export default{
    data(){
        return{
            label,
            switchdate,   
        }
    },
    props:{
        
        id:{
            default:0,
        },
        cards:{
            default:{
                like:[{count:0}],
                islike:[{count:0}],
                comcount:[{count:0}]
            },
        },
        index:{
            default:0,
        }
        
    },
    computed:{
        card(){
            return this.cards
        },
    
        idFlag(){
            return this.id;
        },

        user(){
            return this.$store.state.user
        },
    },
    created(){
        // console.log(this.card);

    },
    methods:{
        toDetail(){
            if(this.user.id != '::1'){
                this.$emit('toDetail')
            }else{
                alert('请先登录')
                 // 去往个人中心
                this.$router.push('/person')
            }
        },
        clickLike(){
            
            console.log(this.card);
            if(this.card.islike[0].count == 0){
                let data = {
                    type:0,
                    postId: this.card.id,
                    userId: this.user.id,
                    moment: new Date(),
                }
                // 前端数据传入后端处理
                insertFeedback(data).then(() => {      
                })
                // 重新渲染
                this.card.like[0].count ++
                this.card.islike[0].count ++
            }
        }
    }
} 
</script>
<style lang="less" scoped>
@import '../assets//fonts/icon-xin/iconfont.css';
@import '../assets//fonts/icon-pinglun/iconfont.css';

.knowledge-card{
    &:hover{
        border: 1px solid @primary-color;
    }
    width:80%;
    height:auto;
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 180px;

    overflow: hidden; /* 隐藏溢出部分的文字 */
    white-space: normal; /* 文字换行 */

    // border: 1px solid red;

    /* border-box 代表 设置的宽高包含内部的padding值 */
    box-sizing: border-box;
    position: relative;

    /* 第一个值表示上边距（top），第二个值表示右边距（right），第三个值表示下边距（bottom），第四个值表示左边距（left） */
    padding: 10px 20px;

    .top{
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;
        p{
            font-size: 12px;
            color: @gray-3;
        }
    }
    .message{
        height: auto;
        /* font-family: HanziPenSC-W3; */
        font-size: 14px;
        color: @gray-1;
        margin-bottom: 50px;
    }
    .foot{
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left:0;
        width:100%;
        padding: 0 20px;
        margin-top: 0px;
        box-sizing: border-box;

        .foot-left{
            display: flex;

            .value{
                font-size: 14px;
                color: @gray-3;
                line-height: 16px;
                padding-left: 4px;
            }

            .iconfont{
                font-size: 16px;
                color: @gray-3;
            }
            .icon{
                padding-right: 8px;
                display: flex;
                align-items: center;
            }
            .icon-xin{
                cursor:pointer;
                transition: @trans;
                &:hover{
                    color:@like-color;
                }
            }

            .islike{
                color:@like-color;
            }

        }

        .name{
            font-size: 16px;
            color: @gray-1;
        }
    }
}
</style>
