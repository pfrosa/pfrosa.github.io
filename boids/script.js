const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;

class Boid {
    constructor(color = 'black') {
        this.velocity = {
            x: Math.random() * 3,
            y: Math.random() * 3,
        };

        this.position = {
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT,
        };

        this.acceleration = {
            x: 0,
            y: 0,
        }
        this.color = color;
        this.maxVelocity = 4;
        this.perception = 50;
        this.dead = false;
    }

    update() {
        
        if(this.position.x > CANVAS_WIDTH ) this.position.x = 0;
        else if (this.position.x < 0)this.position.x = CANVAS_WIDTH;
        else  this.position.x += this.velocity.x;
        
        if(this.position.y > CANVAS_HEIGHT ) this.position.y = 0;
        else if (this.position.y < 0)this.position.y = CANVAS_HEIGHT;
        else  this.position.y += this.velocity.y;
        
        this.velocity = limitMag(this.velocity, this.maxVelocity);
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        
    }

    align(boids) {
        const flock = boids.filter(boid => {
            const distance = Math.sqrt(
                Math.pow(this.position.x - boid.position.x, 2) +
                Math.pow(this.position.y - boid.position.y, 2)
            );
            return boid.color == this.color && boid != this && distance < this.perception;
        })

        if (flock.length > 0) {
            let steering = flock.reduce((totalVelocity, boid) => {
                totalVelocity.x += boid.velocity.x;
                totalVelocity.y += boid.velocity.y;
                return totalVelocity;
            }, { x: 0, y: 0 });
           
            steering.y /= flock.length;
            steering.x /= flock.length;
            steering = setMag(steering, 5);
            steering.y -= this.velocity.y;
            steering.x -= this.velocity.x;
            steering = limitMag(steering, 1);

            this.acceleration.x += steering.x;
            this.acceleration.y += steering.y;
         
        }
    }

    cohesion(boids) {
        const flock = boids.filter(boid => {
            const distance = Math.sqrt(
                Math.pow(this.position.x - boid.position.x, 2) +
                Math.pow(this.position.y - boid.position.y, 2)
            );
            return boid.color == this.color && boid != this && distance < this.perception;
        })

        if (flock.length > 0) {
            let steering =  flock.reduce((totalPosition, boid) => {
                totalPosition.x += boid.position.x;
                totalPosition.y += boid.position.y;
                return totalPosition;
            }, { x: 0, y: 0 });

            steering.y /= flock.length;
            steering.x /= flock.length;
            steering.y -= this.position.y;
            steering.x -= this.position.x;
            steering = setMag(steering, 5);
            steering.y -= this.velocity.y;
            steering.x -= this.velocity.x;
            steering = limitMag(steering, 1);

            this.acceleration.x += steering.x;
            this.acceleration.y += steering.y;
        }
    }

    separation(boids) {
        const flock = boids.filter(boid => {
            const distance = Math.sqrt(
                Math.pow(this.position.x - boid.position.x, 2) +
                Math.pow(this.position.y - boid.position.y, 2)
            );
            return boid.color == this.color && boid != this && distance < ( this.perception / 2 ) ;
        })

        if (flock.length > 0) {
            let steering =  flock.reduce((totalPosition, boid) => {
                const distance = Math.pow(this.position.x - boid.position.x, 2) +
                    Math.pow(this.position.y - boid.position.y, 2);

                let diff = {
                    x: this.position.x - boid.position.x,
                    y: this.position.y - boid.position.y,
                }
                diff.x /= distance;
                diff.y /= distance;
                totalPosition.x += diff.x;
                totalPosition.y += diff.y;
                return totalPosition;
            }, { x: 0, y: 0 });

            steering.y /= flock.length;
            steering.x /= flock.length;
            steering = setMag(steering, 5);
            steering.y -= this.velocity.y;
            steering.x -= this.velocity.x;
            steering = limitMag(steering, 1.5);

            this.acceleration.x += steering.x;
            this.acceleration.y += steering.y;
        }
    }

    avoidPredator(predator){
        let steering = { x:0, y:0};
        const distance = Math.sqrt(
            Math.pow(this.position.x - predator.position.x, 2) +
            Math.pow(this.position.y - predator.position.y, 2));
        if(distance <= this.perception * 2){
            let diff = {
                x: this.position.x - predator.position.x,
                y: this.position.y - predator.position.y,
            }
            steering = limitMag(diff, 2);
        }

        this.acceleration.x += steering.x;
        this.acceleration.y += steering.y;
    }
}

class Predator {
    constructor(){
        this.position = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2,
        };
        this.velocity = {
            x: Math.random(),
            y: Math.random(),
        }
        this.velocity = setMag(this.velocity,2);
        this.rotationDegree = 0;
        this.size = 15;
        this.fome = 0;
        this.limiteFome = 360; // 360
        this.huntVelocity = 7;//6
        this.target = null;
        this.hue = 0;
    }

    acquireTarget(boids){
        const sorted = boids.sort((a,b) => {
            const distanceA =
                Math.pow(this.position.x - a.position.x, 2) +
                Math.pow(this.position.y - a.position.y, 2);

            const distanceB =
                Math.pow(this.position.x - b.position.x, 2) +
                Math.pow(this.position.y - b.position.y, 2);

            return distanceA - distanceB;
        })
        this.target = sorted[0];
        console.log(this.target);
    }

    update(boids){
        if( this.fome >=  this.limiteFome){
            if(!this.target){
                this.acquireTarget(boids);
            } else {
                this.follow();
            }
        }
        
        if(this.position.x > CANVAS_WIDTH ) this.position.x = 0;
        else if (this.position.x < 0)this.position.x = CANVAS_WIDTH;
        else  this.position.x += this.velocity.x;
    
        if(this.position.y > CANVAS_HEIGHT ) this.position.y = 0;
        else if (this.position.y < 0)this.position.y = CANVAS_HEIGHT;
        else  this.position.y += this.velocity.y;

        this.rotationDegree = Math.atan(this.velocity.y / this.velocity.x) * 180/Math.PI;
        if(this.velocity.x < 0 && this.velocity.y < 0) this.rotationDegree  -= 180;
        if(this.velocity.x < 0 && this.velocity.y >= 0) this.rotationDegree  += 180
       

        this.velocity = setMag(this.velocity, 2)
        this.fome++;
    }

    follow(){
        
        if(this.target){
            const distanciaAoQuardado = Math.pow(this.target.position.x - this.position.x,2) + Math.pow(this.target.position.y - this.position.y,2); 
            if(distanciaAoQuardado > 80){
                this.velocity.x = this.target.position.x;
                this.velocity.y = this.target.position.y;
                this.velocity.x -= this.position.x;
                this.velocity.y -= this.position.y;
                this.velocity = setMag(this.velocity, this.huntVelocity);
            } else {
                this.target.dead = true;
                this.target = null;
                this.fome = 0;
            }
        }
    }

    show(ctx){
        this.hue = this.hue == 360 ? 0 : this.hue + 3;
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate((Math.PI / 180) *  this.rotationDegree);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.fillStyle = 'cyan';
        ctx.filter = `hue-rotate(${this.hue}deg)`;  
        ctx.beginPath();
        ctx.moveTo(this.position.x - this.size, this.position.y + this.size);
        ctx.lineTo(this.position.x + this.size, this.position.y);
        ctx.lineTo(this.position.x - this.size, this.position.y - this.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        if(this.target){
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            this.hue = this.hue == 360 ? 0 : this.hue + 5;
            ctx.filter = `hue-rotate(${this.hue}deg)`;  
                           
            ctx.beginPath();
            ctx.moveTo(this.target.position.x + 5 - 15, this.target.position.y + 5);
            ctx.lineTo(this.target.position.x + 5 + 15, this.target.position.y + 5);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.target.position.x + 5 , this.target.position.y + 5 - 15);
            ctx.lineTo(this.target.position.x + 5 , this.target.position.y + 5 + 15);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.target.position.x + 5, this.target.position.y + 5, 10, 0, 2* Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.restore();
        }
        document.getElementById("d").innerHTML = this.rotationDegree.toFixed(2);
        document.getElementById("x").innerHTML = this.velocity.x.toFixed(2);
        document.getElementById("y").innerHTML = this.velocity.y.toFixed(2);
    }
}

function getMag(vector){
    const magnitude = Math.sqrt( vector.x * vector.x  + vector.y * vector.y)
    return magnitude;
}

function setMag(vector, mag) {
    const newVect = {x: 0, y: 0};
    const magnitude = getMag(vector);
    newVect.x = mag * (vector.x / magnitude);
    newVect.y = mag * (vector.y / magnitude);
    return newVect;
}

function limitMag(vector,mag){
    if(getMag(vector) > mag){
        return setMag(vector, mag);
    } else {
        return vector;
    }
}

class Game {
    boids = [];
    context = null;

    constructor() {
        const canvas = document.getElementById("canvas");
        const Context2D = canvas.getContext('2d');
        this.context = Context2D;
        this.boids.push(...[...Array(100)].map(_ => new Boid('blue')));
        this.boids.push(...[...Array(100)].map(_ => new Boid('red')));
        this.boids.push(...[...Array(100)].map(_ => new Boid('green')));
        this.predators = [new Predator(), new Predator(), new Predator()];
    }

    atualizaEstado() {
        this.boids = this.boids.filter(boid => !boid.dead);
        this.boids.forEach(boid => {
            boid.align(this.boids);
            boid.cohesion(this.boids);
            boid.separation(this.boids);
            this.predators.forEach(predator => {
              boid.avoidPredator(predator);
            })
            //boid.avoidPredator(this.predator);
            boid.update();
        });
        this.predators.forEach(predator => {
          predator.update(this.boids);
        })
    }

    desenha() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.boids.forEach(boid => {
            this.context.fillStyle = boid.color;
            this.context.fillRect(boid.position.x, boid.position.y, 10, 10);
        });
        this.predators.forEach(predator => {
            predator.show(this.context);
        })
    }

    gameLoop() {
        this.atualizaEstado();
        this.desenha();
    }

}

const game = new Game();
game.desenha();

setInterval(() => game.gameLoop(), 1000 / 60);
