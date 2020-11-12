class Bob {
    constructor(ctx, mass, theta, velocity_x, velocity_y) {
        this.ctx = ctx;
        this.mass = mass;
        this.theta = theta;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.x = 460;
        this.y = 120;
        let self = this; 
        this.radius = radius(this.x, 360, this.y, 260);
        this.clock = setInterval(function () {
            const G = 9.8;
            self.theta = calculate_theta(self.x, self.y, 360, 260);
            let acceleration_vector = G * self.mass * Math.sin(self.theta);
            let acceleration_x = -acceleration_vector * Math.cos(self.theta);
            let acceleration_y = acceleration_vector * Math.sin(self.theta);
            //self.velocity_x = acceleration_x;
            //self.velocity_y = acceleration_y;
            //self.velocity();
            self.x += v_x(this.x, this.y, 360, 260) / 10;
            self.y += v_y(this.x, this.y, 360, 260) / 10;
            self.draw();
        }, 10);

        
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, 720, 720);
        this.ctx.fillText(this.theta, 100, 100);

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(360, 260, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

function calculate_theta(x, y, pivot_x, pivot_y) {
    let diff_x = x - pivot_x;
    let diff_y = y - pivot_y;
    let theta = Math.atan(diff_x / diff_y);

    if (diff_x < 0 && diff_y < 0) { theta = (Math.PI) + theta; } // adjust for quadrant I
    if (diff_x > 0 && diff_y < 0) { theta = theta - Math.PI; } // adjust for quadrant II

    if (diff_y === 0 && diff_x < 0) { theta = 3 * Math.PI / 2; } // adjust for axes
    if (diff_y === 0 && diff_x > 0) { theta = Math.PI / 2; }
    if (diff_x === 0 && diff_y > 0) { theta = Math.PI; }
    if (diff_x === 0 && diff_y < 0) { theta = 0; }

    if (theta < 0) { theta += Math.PI * 2; }
    if (theta > Math.PI * 2) { theta -= Math.PI * 2; }
    return theta;
}

function radius(x1, x2, y1, y2) {
        let x = x1 - x2;
        let y = y1 - y2;
        return Math.sqrt((x*2)+(y*2));
    }
function v_x(x, y, x2, y2){return velocity() * Math.cos(calculate_theta(x, y, x2, y2))}
function v_y(x, y, x2, y2){return velocity() * Math.sin(calculate_theta(x, y, x2, y2))}

function velocity() {return Math.sqrt(radius() * calculate_tension())}
function calculate_tension() {
        return 9.8 * this.mass * Math.cos(this.theta);
    }

