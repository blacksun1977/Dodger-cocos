(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TurretControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfdeckAElVHAIkJX5f1Sh8/', 'TurretControl', __filename);
// Script/TurretControl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        BulletPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //this.node.runAction(cc.repeatForever(cc.rotateBy(1,30)));
        //var action = cc.rotateBy(1,30);
        //this.node.runAction(action);
        this.CreateBullet();
    },

    start: function start() {
        //cc.log(1);
    },


    update: function update(dt) {
        this.node.rotation += dt * 10;
    },

    Rotate: function Rotate() {
        //var action = cc.rotateBy(30);
        //this.node.runAction(action);
    },
    CreateBullet: function CreateBullet() {
        //cc.log(1);
        var newBullet = cc.instantiate(this.BulletPrefab);
        //newBullet.getComponent("BulletControl").init();
        newBullet.x = 0;
        newBullet.y = 0;
        newBullet.parent = this.node;
        cc.log(this.node.rotation);
        cc.log(Math.PI);
        cc.log(cc.pForAngle(this.node.rotation * Math.floor(Math.PI / 180)).x);
        cc.log(cc.pForAngle(this.node.rotation * Math.floor(Math.PI / 180)).y);
        newBullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(cc.pForAngle(this.node.rotation * Math.PI / 180).y * 100, cc.pForAngle(this.node.rotation * Math.PI / 180).x * 100);

        cc.log(newBullet);
        this.scheduleOnce(function () {
            this.CreateBullet();
        }, 2);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=TurretControl.js.map
        