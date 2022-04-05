const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7

var atacksound = new Audio("sound1.mp3");

var enemyattack = new Audio("sound2.mp3");

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Sprite-0002.png',
    scale: 2.2
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x:200,
        y:50
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: 0,
        y: 0
    },

    imageSrc: './Sprites/Anakin/Anakin_Idle.png',
    framesMax: 5,
    scale: 2.5,
    offset: {
        x: 0,
        y: -5
    },
    sprites: {
        idle: {
            imageSrc: './Sprites/Anakin/Anakin_Idle.png',
            framesMax: 5
        },
        run: {
            imageSrc: './Sprites/Anakin/Anakin_Run.png',
            framesMax: 13,
        },
        jump: {
            imageSrc: './Sprites/Anakin/Anakin_Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './Sprites/Anakin/Anakin_Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './Sprites/Anakin/Anakin_Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './Sprites/Anakin/Anakin_TakeHit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './Sprites/Anakin/Anakin_Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 50,
            y: 50
        },
        width: 85,
        height: 50
    }
})


const enemy = new Fighter({
    position: {
        x:800,
        y:50
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './Sprites/General/General_Idle.png',
    framesMax: 3,
    scale: 1.8,
    offset: {
        x: 0,
        y: -8
    },
    sprites: {
        idle: {
            imageSrc: './Sprites/General/General_Idle.png',
            framesMax: 3
        },
        run: {
            imageSrc: './Sprites/General/General_Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './Sprites/General/General_Jump.png',
            framesMax: 1,
        },
        fall: {
            imageSrc: './Sprites/General/General_Fall.png',
            framesMax: 1,
        },
        attack1: {
            imageSrc: './Sprites/General/General_Attack2.png',
            framesMax: 3    
        },
        takeHit: {
            imageSrc: './Sprites/General/General_TakeHit.png',
            framesMax: 2
        },
        death: {
            imageSrc: '/Sprites/General/General_Death.png',
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: -50,
            y: 50
        },
        width: 100,
        height: 50
    }
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    //shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    console.log(canvas.width)
    console.log(player.position.x)


    //player movement
    
    if(player.position.x <= 0){
        player.velocity.x=0;
        console.log(player.velocity.x)
        player.switchSprite('idle')
        if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x=6;
            player.switchSprite('run')
        }
    }else if(player.position.x + player.width >= canvas.width){
        player.velocity.x=0;
        console.log(player.velocity.x)
        player.switchSprite('idle')
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x=-6;
            player.switchSprite('run')
        }
    }
    else{
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x=-6;
            player.switchSprite('run')
        }else if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x=6;
            player.switchSprite('run')
        }else {
            player.switchSprite('idle')
        }
    }


    //jumping
    if(player.velocity.y < 0) {
        player.switchSprite('jump')
    }else if(player.velocity.y > 0) {
        player.switchSprite('fall')
    }else if(player.velocity.y == 0 ){
        jumpcheckplayer = true
    }

    //enemy movement
    if(enemy.position.x <= 0){
        enemy.velocity.x=0;
        console.log(enemy.velocity.x)
        enemy.switchSprite('idle')
        if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x=6;
            enemy.switchSprite('run')
        }
    }else if(enemy.position.x + enemy.width >= canvas.width){
        enemy.velocity.x=0;
        console.log(enemy.velocity.x)
        enemy.switchSprite('idle');
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x=-6;
            enemy.switchSprite('run')
        }
    }
    else{
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x=-6;
            enemy.switchSprite('run')
        }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x=6;
            enemy.switchSprite('run')
        }else {
            enemy.switchSprite('idle')
        }
    }

    //jumping
    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    } else if( enemy.velocity.y == 0 ){
        jumpcheckenemy = true; 
    }

    //detect for collision & enemy gets hit
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking && player.framesCurrent === 1
        ) {
        enemy.takeHit()
        player.isAttacking = false
        
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    //if player misses
    if(player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    //this is where our player gets hit
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking && enemy.framesCurrent === 1
        ) {
        player.takeHit()

        enemy.isAttacking = false
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //if enemy misses
    if(enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    //end game early
    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player,enemy,timerId})
    }
}


var jumpcheckenemy = true;

var jumpcheckplayer=true;
window.addEventListener('keydown', (event) => {
    if(!player.dead) {

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break
        case 'w':
            if(jumpcheckplayer==true){
                player.velocity.y = -18
                jumpcheckplayer=false;
                }   
        break

        case ' ':
            player.attack()
            atacksound.play()
        break
        }
        
    }

    if(!enemy.dead) {
    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break

        case 'ArrowUp':
            if(jumpcheckenemy == true){
                enemy.velocity.y = -18
                jumpcheckenemy = false;
            }
            console.log(jumpcheck)
        break
    }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break
    }

    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break

        case 'ArrowDown':
            //enemy.isAttacking = true
            enemy.attack()
            enemyattack.play()


        break
    }

})

function play(){
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('bar').style.display = 'inline-block';
    document.getElementById('myVideo').style.display = 'none';
    document.getElementById('heading').style.display = 'none';
    document.getElementById('story').style.display = 'none';


    animate()
    decreaseTimer()
}



function playAgain(){
    location.reload()
}
