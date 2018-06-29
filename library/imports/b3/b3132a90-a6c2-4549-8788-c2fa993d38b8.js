"use strict";
cc._RF.push(module, 'b3132qQpsJFSYeIwvqZPTi4', 'GameManager');
// Script/GameManager.js

'use strict';

var Common = require('GameCommon');

cc.Class({
    extends: cc.Component,

    properties: {
        Canvas: {
            default: null,
            type: cc.Node
        },
        //玩家属性
        label_PlayerSpeed: {
            default: null,
            type: cc.Label
        },

        label_Skill_1_Name: {
            default: null,
            type: cc.Label
        },
        label_Skill_1_Time: {
            default: null,
            type: cc.Label
        },
        //难度属性

        label_RotationSpeed: {
            default: null,
            type: cc.Label
        },

        label_ShootSpeed: {
            default: null,
            type: cc.Label
        },

        label_BulletSpeed: {
            default: null,
            type: cc.Label
        },

        label_BulletLifeTime: {
            default: null,
            type: cc.Label
        },

        //游戏进程
        label_Score: {
            default: null,
            type: cc.Label
        },
        label_GameOverScore: {
            default: null,
            type: cc.Label
        },
        Player: {
            default: null,
            type: cc.Node
        },
        Turret: {
            default: null,
            type: cc.Node
        },
        //特定点位
        Block1: {
            default: null,
            type: cc.Node
        },
        Block2: {
            default: null,
            type: cc.Node
        },
        Block3: {
            default: null,
            type: cc.Node
        },
        Block4: {
            default: null,
            type: cc.Node
        },
        //UI
        MainMenuUI: {
            default: null,
            type: cc.Node
        },
        GuideUI: {
            default: null,
            type: cc.Node
        },
        GameSetUI: {
            default: null,
            type: cc.Node
        },
        GameOverUI: {
            default: null,
            type: cc.Node
        },
        GameAreaUI: {
            default: null,
            type: cc.Node
        },
        GameRankUI: {
            default: null,
            type: cc.Node
        },
        UpdateLogUI: {
            default: null,
            type: cc.Node
        },

        //UI
        JoyUI: {
            default: null,
            type: cc.Node
        },

        SkillButton1: {
            default: null,
            type: cc.Node
        },
        SkillButton2: {
            default: null,
            type: cc.Node
        },
        SkillButton3: {
            default: null,
            type: cc.Node
        },

        //按钮
        UseEnergyBarUI: {
            default: null,
            type: cc.Toggle
        },

        //预构体
        upRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upShootSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab
        },
        upPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        upSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab
        },
        GetShieldPrefab: {
            default: null,
            type: cc.Prefab
        },

        PointRotationSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointShootSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointBulletSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointBulletLifeTimePrefab: {
            default: null,
            type: cc.Prefab
        },
        PointPlayerSpeedPrefab: {
            default: null,
            type: cc.Prefab
        },
        PointSkill_1_MAXPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //开启物理引擎
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        //this.node.getComponent('DeviceMotionControl').Prepare();

        this.GameSpeed = 0;
        this.GamePause = true;
        this.CanClick = true;
        //初始化游戏参数
        this.MainMenuUI.active = true;
        this.GuideUI.active = false;
        this.GameAreaUI.active = false;
        this.GameSetUI.active = false;
        this.GameOverUI.active = false;
        this.GameRankUI.active = false;
        this.UpdateLogUI.active = false;
        //this.GameInit();
        this.SetPara();
    },

    SetPara: function SetPara() {
        this.ActiveSkill1Energy = 1;
        this.PlayerMaxSpeed = 12;

        this.ActiveSkill2Energy = 5;

        this.PassiveSkill2Energy = 5;
    },

    ChooseActiveSkill: function ChooseActiveSkill() {
        this.GameAreaUI.active = false;
        this.GameSetUI.active = true;
    },

    GameInit: function GameInit() {
        this.GameAreaUI.active = true;
        this.PlayerSpeed2UI = 1;

        this.RotationSpeedUI = 1;
        this.BulletScaleUI = 1;
        this.ShootSpeedUI = 1;
        this.BulletSpeedUI = 1;
        this.BulletLifeTimeUI = 1;

        this.Skill_1_On = false;
        this.Skill_1_Active = false;
        this.Skill_1_Level = 1;
        this.Skill_1_Time = 10;
        this.Skill_1_Max = 10;

        this.GameSpeed = 1;
        this.PlayerSlow = 1;
        this.Score = 0;
        this.ItemNum = 1;

        this.Player.x = -200;
        this.Player.y = 0;

        this.GameSpeed = 1;
        this.GamePause = false;
        this.CanClick = true;

        this.ItemLifeTime1 = 0;
        this.ItemLifeTime2 = 10;

        this.UpdateData();
        this.SwapBadItem();

        this.UseEnergyBar = this.UseEnergyBarUI.isChecked;
        this.UseJoy = true;
        this.UseDevice = false;
        this.UseTouch = false;

        this.Turret.getComponent('TurretControl').GameInit();
        this.Player.getComponent('PlayerControl').GameInit();
        this.node.getComponent('DeviceMotionControl').GameInit();

        if (this.UseJoy) {
            this.JoyUI.active = true;
            this.SkillButton1.active = true;
        } else {
            this.JoyUI.active = false;
            this.SkillButton1.active = false;
        }
        if (this.UseDevice) this.SkillButton2.active = true;else this.SkillButton2.active = false;
        if (this.UseTouch) this.SkillButton3.active = true;else this.SkillButton3.active = false;
    },
    GameOver: function GameOver() {
        this.GamePause = true;
        this.scheduleOnce(function () {
            this.PlayerDead();
        }, 1);
    },
    PlayerDead: function PlayerDead() {
        this.Player.getComponent('PlayerControl').Die();
        this.scheduleOnce(function () {
            this.GameReset();
        }, 1);
    },
    GameReset: function GameReset() {
        var childernlist = this.node.children;
        //cc.log(this.node.childrenCount);
        for (var i = 0; i < this.node.childrenCount; i++) {
            //cc.log(childernlist[i]);
            childernlist[i].destroy();
        }

        this.Turret.getComponent('TurretControl').GameReset();
        //this.GameAreaUI.active = false;
        this.GameOverUI.active = true;
        this.label_GameOverScore.string = '得分：' + this.Score.toString();
        this.GameRankUI.active = true;

        this.SubmitScore();
        this.GameRankUI.getComponent('GameRankControl').GetFirendRank();
        this.CanClick = false;
    },
    start: function start() {},
    update: function update(dt) {
        if (this.GamePause) this.GameSpeed = 0;else {
            if (!this.Skill_1_On) {
                if (this.Skill_1_Time < this.Skill_1_Max) {
                    this.Skill_1_Time += dt / 2;
                    this.UpdateData();
                }
            }
            if (this.Skill_1_Type == Common.ActiveSkillNum.SlowTime) {
                if (this.Skill_1_On) {
                    if (this.Skill_1_Time > 0) {
                        this.Skill_1_Active = true;
                        this.GameSpeed = 1;
                        this.Skill_1_Time -= dt * this.ActiveSkill1Energy;
                        if (this.Skill_1_Time < 0) this.Skill_1_Time = 0;
                        this.UpdateData();
                    } else {
                        this.Skill_1_Active = false;
                        this.GameSpeed = 1;
                        this.Skill_1_Time = 0;
                    }
                } else {
                    this.Skill_1_Active = false;
                    this.GameSpeed = 1;
                }
            }
        }
        //cc.log(this.GameSpeed);
    },


    UpdateData: function UpdateData() {
        //更新UI数据
        this.label_PlayerSpeed.string = this.PlayerSpeed2UI.toString();
        this.label_RotationSpeed.string = this.RotationSpeedUI.toString();
        this.label_ShootSpeed.string = this.ShootSpeedUI.toString();
        this.label_BulletSpeed.string = this.BulletSpeedUI.toString();
        this.label_BulletLifeTime.string = this.BulletLifeTimeUI.toString();
        this.label_Score.string = this.Score.toString();
        var tmp = (Math.floor(this.Skill_1_Time * 10) / 10).toString();
        if (tmp.length < 3) tmp += '.0';
        this.label_Skill_1_Time.string = tmp;

        this.Player.getComponent('PlayerControl').EnergyBar.getComponent('EnergyBarControl').UpdateData(this.Skill_1_Time, this.Skill_1_Max);

        //计算具体参数

        // let i;
        // for(i=1;i<20;i++)
        //     cc.log(Math.log(i)*6+20);

        this.PlayerSpeed2 = Math.log(this.PlayerSpeed2UI) * 5 + 20;
        this.PlayerSpeed1 = this.PlayerSpeed2;
        this.RotationSpeed = 10 + this.RotationSpeedUI;
        this.ShootSpeed = 2 * 15 / (15 + this.ShootSpeedUI);
        this.BulletSpeed = 200 + 2 * this.BulletSpeedUI;
        this.BulletLifeTime = 4 + this.BulletLifeTimeUI * 0.5;
        this.BulletScale = 20 / (40 + this.BulletScaleUI) + 0.2;
    },

    _getARandomPositon: function _getARandomPositon() {
        var max, min, x, y;
        do {
            var min_distance = 20;
            var max_distance = 1000;

            if (this.Score >= 0 && this.Score < 5) {
                min_distance = 100;
                max_distance = 150;
            }
            if (this.Score >= 5 && this.Score < 15) {
                min_distance = 150;
                max_distance = 200;
            }
            if (this.Score >= 15 && this.Score < 25) {
                min_distance = 200;
                max_distance = 250;
            }
            if (this.Score >= 25 && this.Score < 35) {
                min_distance = 250;
                max_distance = 300;
            }
            if (this.Score >= 35 && this.Score < 50) {
                min_distance = 300;
                max_distance = 400;
            }

            max = Math.min(290, this.Player.getPosition().x + max_distance);
            min = Math.max(-290, this.Player.getPosition().x - max_distance);
            x = Math.random() * (max - min + 1) + min;

            max = Math.min(290, this.Player.getPosition().y + max_distance);
            min = Math.max(-290, this.Player.getPosition().y - max_distance);
            y = Math.random() * (max - min + 1) + min;
            //是否离4个方块太近
            if (this._getDistance(cc.v2(x, y), this.Block1.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block2.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block3.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Block4.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Turret.getPosition()) < 35) continue;
            if (this._getDistance(cc.v2(x, y), this.Player.getPosition()) < min_distance) continue;
            break;
        } while (true);

        return cc.v2(x, y);
    },

    _getDistance: function _getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    SwapGoodItem: function SwapGoodItem(ItemType) {
        var Itemlist = new Array(this.upPlayerSpeedPrefab, this.upSkill_1_MAXPrefab, this.GetShieldPrefab);
        var i;
        if (this.Player.getComponent('PlayerControl').HaveShield) i = Math.floor(Math.random() * 2);else i = Math.floor(Math.random() * 3);

        var newItem;
        if (ItemType == null) newItem = cc.instantiate(Itemlist[i]);else newItem = cc.instantiate(ItemType);

        newItem.parent = this.node;
        var postion = this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapBadItem: function SwapBadItem() {
        var Itemlist = new Array(this.upRotationSpeedPrefab, this.upShootSpeedPrefab, this.upBulletSpeedPrefab, this.upBulletLifeTimePrefab);
        var i = Math.floor(Math.random() * 4);
        if (this.Score < 4) i = this.Score;

        var newItem = cc.instantiate(Itemlist[i]);

        newItem.parent = this.node;
        var postion = this._getARandomPositon();
        newItem.x = postion.x;
        newItem.y = postion.y;
    },

    SwapItem: function SwapItem() {
        if (this.ItemNum == 5) return;
        if (this.Score == 5) {
            this.SwapBadItem();
        }
        if (this.Score == 15) {
            this.SwapBadItem();
        }
        if (this.Score == 30) {
            this.SwapBadItem();
        }
        if (this.Score % 5 == 0) {
            if (this.Score == 5) this.SwapGoodItem(this.GetShieldPrefab);else this.SwapGoodItem();
        } else this.SwapBadItem();
    },

    createPoint: function createPoint(point_id, pointTarget) {
        var Pointlist = new Array(this.PointRotationSpeedPrefab, this.PointShootSpeedPrefab, this.PointBulletSpeedPrefab, this.PointBulletLifeTimePrefab, this.PointPlayerSpeedPrefab, this.PointSkill_1_MAXPrefab);

        var newPoint = cc.instantiate(Pointlist[point_id]);
        newPoint.parent = this.Canvas;
        newPoint.x = this.Player.getPosition().x;
        newPoint.y = this.Player.getPosition().y;
        newPoint.getComponent('PointControl').target = pointTarget.getChildByName("1");
    },


    upRotationSpeed: function upRotationSpeed() {
        this.RotationSpeedUI += 1;
        this.BulletScaleUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(0, this.label_RotationSpeed.node);
    },

    upShootSpeed: function upShootSpeed() {
        this.ShootSpeedUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(1, this.label_ShootSpeed.node);
    },

    upBulletSpeed: function upBulletSpeed() {
        this.BulletSpeedUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(2, this.label_BulletSpeed.node);
    },
    upBulletLifeTime: function upBulletLifeTime() {
        this.BulletLifeTimeUI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(3, this.label_BulletLifeTime.node);
    },

    upPlayerSpeed: function upPlayerSpeed() {
        this.PlayerSpeed2UI += 1;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(4, this.label_PlayerSpeed.node);
    },

    upSkill_1_MAX: function upSkill_1_MAX() {
        this.Skill_1_Max += 2;
        this.Skill_1_Time += 5;
        if (this.Skill_1_Time > this.Skill_1_Max) this.Skill_1_Time = this.Skill_1_Max;
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
        this.createPoint(5, this.label_Skill_1_Time.node);
    },

    GetShield: function GetShield() {
        this.Score += 1;
        this.UpdateData();
        this.SwapItem();
    },

    Skill_1_Start: function Skill_1_Start() {
        if (this.GamePause) return;
        if (this.Skill_1_Type == Common.ActiveSkillNum.Bomb) {
            if (this.Skill_1_Time >= this.ActiveSkill2Energy) {
                this.Player.getComponent('PlayerControl').UseBomb();
                this.Skill_1_Time -= this.ActiveSkill2Energy;
                this.UpdateData();
            } else {
                this.PlayerPowerFlash(3);
                this.Player.getComponent('PlayerControl').EnergyBar.getComponent('EnergyBarControl').EnergyBarFlash(3);
            }
        }
    },

    PlayerPowerFlash: function PlayerPowerFlash(num) {
        if (num > 0) {
            this.label_Skill_1_Time.node.color = new cc.color(245, 62, 62);
            this.scheduleOnce(function () {
                this.PlayerPowerFlashEnd(num);
            }, 0.2);
        }
    },

    PlayerPowerFlashEnd: function PlayerPowerFlashEnd(num) {
        this.label_Skill_1_Time.node.color = new cc.color(255, 255, 255);
        this.scheduleOnce(function () {
            this.PlayerPowerFlash(num - 1);
        }, 0.2);
    },

    OnPressLabel: function OnPressLabel(type) {
        if (!this.CanClick) return;
        if (type == 0) {
            this.MainMenuUI.active = false;
            this.UpdateLogUI.active = true;
        }
    },

    OnPressGameGuide: function OnPressGameGuide() {
        if (!this.CanClick) return;
        this.MainMenuUI.active = false;
        this.GuideUI.active = true;
        this.GuideUI.getComponent('GuideUIControl').Init();
    },

    OnPressGameStart: function OnPressGameStart() {
        if (!this.CanClick) return;
        this.MainMenuUI.active = false;
        this.ChooseActiveSkill();
    },

    OnPressGameSettingOk: function OnPressGameSettingOk() {
        if (this.Skill_1_Type != null && this.Skill_2_Type != null) {
            this.GameInit();
            this.GameSetUI.active = false;
        }
    },

    OnPressGameRank: function OnPressGameRank() {
        if (!this.CanClick) return;
        this.GameRankUI.active = true;
        this.SubmitScore();
        this.GameRankUI.getComponent('GameRankControl').GetFirendRank();
        this.CanClick = false;
    },

    OnPressShare: function OnPressShare() {
        window.wx.shareAppMessage();
    },

    SubmitScore: function SubmitScore() {
        if (this.Score == null) this.Score = 0;
        var testDate = new Date();
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: Common.MessageType.SubmitData,
                MAIN_MENU_NUM: "Score",
                Data: this.Score
            });
        } else {
            cc.log("提交得分:Score:" + this.Score);
        }
    }
});

cc._RF.pop();