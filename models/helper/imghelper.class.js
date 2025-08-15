export class ImgHelper {
    static BACKGROUND = {
        air: 'assets/img/background/air.png',
        layers: [
            [
                'assets/img/background/layer-1/1.png',
                'assets/img/background/layer-1/2.png',
                'assets/img/background/layer-1/1.png',
                'assets/img/background/layer-1/2.png'
            ],[
                'assets/img/background/layer-2/1.png',
                'assets/img/background/layer-2/2.png',
                'assets/img/background/layer-2/1.png',
                'assets/img/background/layer-2/2.png'
            ],[
                'assets/img/background/layer-3/1.png',
                'assets/img/background/layer-3/2.png',
                'assets/img/background/layer-3/1.png',
                'assets/img/background/layer-3/2.png'
            ]
        ],
        clouds: {
            small: 'assets/img/background/clouds/small.png',
            medium: 'assets/img/background/clouds/medium.png',
            large: 'assets/img/background/clouds/large.png'
        }
    }
    static PEPE = {
        idle: [
            'assets/img/pepe/idle/I-1.png',
            'assets/img/pepe/idle/I-2.png',
            'assets/img/pepe/idle/I-3.png',
            'assets/img/pepe/idle/I-4.png',
            'assets/img/pepe/idle/I-5.png',
            'assets/img/pepe/idle/I-6.png',
            'assets/img/pepe/idle/I-7.png',
            'assets/img/pepe/idle/I-8.png',
            'assets/img/pepe/idle/I-9.png',
            'assets/img/pepe/idle/I-10.png'
        ],
        longIdle: [
            'assets/img/pepe/long_idle/I-11.png',
            'assets/img/pepe/long_idle/I-12.png',
            'assets/img/pepe/long_idle/I-13.png',
            'assets/img/pepe/long_idle/I-14.png',
            'assets/img/pepe/long_idle/I-15.png',
            'assets/img/pepe/long_idle/I-16.png',
            'assets/img/pepe/long_idle/I-17.png',
            'assets/img/pepe/long_idle/I-18.png',
            'assets/img/pepe/long_idle/I-19.png',
            'assets/img/pepe/long_idle/I-20.png'
        ],
        walk: [
            'assets/img/pepe/walk/W-21.png',
            'assets/img/pepe/walk/W-22.png',
            'assets/img/pepe/walk/W-23.png',
            'assets/img/pepe/walk/W-24.png',
            'assets/img/pepe/walk/W-25.png',
            'assets/img/pepe/walk/W-26.png',
        ],
        jump: [
            'assets/img/pepe/jump/J-31.png',
            'assets/img/pepe/jump/J-32.png',
            'assets/img/pepe/jump/J-33.png',
            'assets/img/pepe/jump/J-34.png',
            'assets/img/pepe/jump/J-35.png',
            'assets/img/pepe/jump/J-36.png',
            'assets/img/pepe/jump/J-37.png',
            'assets/img/pepe/jump/J-38.png',
            'assets/img/pepe/jump/J-39.png',
        ],
        hurt: [
            'assets/img/pepe/hurt/H-41.png',
            'assets/img/pepe/hurt/H-42.png',
            'assets/img/pepe/hurt/H-43.png',
        ],
        dead: [
            'assets/img/pepe/dead/D-51.png',
            'assets/img/pepe/dead/D-52.png',
            'assets/img/pepe/dead/D-53.png',
            'assets/img/pepe/dead/D-54.png',
            'assets/img/pepe/dead/D-55.png',
            'assets/img/pepe/dead/D-56.png',
            'assets/img/pepe/dead/D-57.png'
        ]
    }
    static ENEMY = {
        chick: {
            walk: [
                'assets/img/enemy/chick/walk/1_w.png',
                'assets/img/enemy/chick/walk/2_w.png',
                'assets/img/enemy/chick/walk/3_w.png',
            ],
            dead: 'assets/img/enemy/chick/dead.png'
        },
        chicken: {
            walk: [
                'assets/img/enemy/chicken/walk/1_w.png',
                'assets/img/enemy/chicken/walk/2_w.png',
                'assets/img/enemy/chicken/walk/3_w.png',
            ],
            dead: 'assets/img/enemy/chicken/dead.png'
        },
        boss: {
            walk: [
                'assets/img/enemy/boss/walk/G1.png',
                'assets/img/enemy/boss/walk/G2.png',
                'assets/img/enemy/boss/walk/G3.png',
                'assets/img/enemy/boss/walk/G4.png'
            ],
            alert: [
                'assets/img/enemy/boss/alert/G5.png',
                'assets/img/enemy/boss/alert/G6.png',
                'assets/img/enemy/boss/alert/G7.png',
                'assets/img/enemy/boss/alert/G8.png',
                'assets/img/enemy/boss/alert/G9.png',
                'assets/img/enemy/boss/alert/G10.png',
                'assets/img/enemy/boss/alert/G11.png',
                'assets/img/enemy/boss/alert/G12.png'
            ],
            attack: [
                'assets/img/enemy/boss/attack/G13.png',
                'assets/img/enemy/boss/attack/G14.png',
                'assets/img/enemy/boss/attack/G15.png',
                'assets/img/enemy/boss/attack/G16.png',
                'assets/img/enemy/boss/attack/G17.png',
                'assets/img/enemy/boss/attack/G18.png',
                'assets/img/enemy/boss/attack/G19.png',
                'assets/img/enemy/boss/attack/G20.png'
            ],
            hurt: [
                'assets/img/enemy/boss/hurt/G21.png',
                'assets/img/enemy/boss/hurt/G22.png',
                'assets/img/enemy/boss/hurt/G23.png'
            ],
            dead: [
                'assets/img/enemy/boss/dead/G24.png',
                'assets/img/enemy/boss/dead/G25.png',
                'assets/img/enemy/boss/dead/G26.png'
            ]
        }
    }
    static COLLECTABLE = {
        bottle: {
            ground: 'assets/img/collectables/bottle/ground.png',
            flip: [
                'assets/img/collectables/bottle/flip/1.png',
                'assets/img/collectables/bottle/flip/2.png',
                'assets/img/collectables/bottle/flip/3.png',
                'assets/img/collectables/bottle/flip/4.png',
            ],
            splash: [
                'assets/img/collectables/bottle/splash/1.png',
                'assets/img/collectables/bottle/splash/2.png',
                'assets/img/collectables/bottle/splash/3.png',
                'assets/img/collectables/bottle/splash/4.png',
                'assets/img/collectables/bottle/splash/5.png',
                'assets/img/collectables/bottle/splash/6.png'
            ]
        },
        coin: 'assets/img/collectables/coin.png'
    }
    static STATUSBAR = {
        helth: {
            empty: 'assets/img/statusbar/health/0.png',
            low: 'assets/img/statusbar/health/20.png',
            halflow: 'assets/img/statusbar/health/40.png',
            halfhigh: 'assets/img/statusbar/health/60.png',
            high: 'assets/img/statusbar/health/80.png',
            full: 'assets/img/statusbar/health/100.png'
        },
        bottles: {
            empty: 'assets/img/statusbar/bottles/0.png',
            low: 'assets/img/statusbar/bottles/20.png',
            halflow: 'assets/img/statusbar/bottles/40.png',
            halfhigh: 'assets/img/statusbar/bottles/60.png',
            high: 'assets/img/statusbar/bottles/80.png',
            full: 'assets/img/statusbar/bottles/100.png'
        },
        coins : {
            empty: 'assets/img/statusbar/coins/0.png',
            low: 'assets/img/statusbar/coins/20.png',
            halflow: 'assets/img/statusbar/coins/40.png',
            halfhigh: 'assets/img/statusbar/coins/60.png',
            high: 'assets/img/statusbar/coins/80.png',
            full: 'assets/img/statusbar/coins/100.png'
        },
        boss: {
            empty: 'assets/img/statusbar/boss/0.png',
            low: 'assets/img/statusbar/boss/20.png',
            halflow: 'assets/img/statusbar/boss/40.png',
            halfhigh: 'assets/img/statusbar/boss/60.png',
            high: 'assets/img/statusbar/boss/80.png',
            full: 'assets/img/statusbar/boss/100.png'
        }
    }
    static SCREENS = {
        start: 'assets/img/screens/start.png',
        lost: 'assets/img/screens/lost.png',
        win: 'assets/img/screens/win.png'
    }
}