$(function () {

    var anim_id;

    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');

    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    var output_txt2 = $('#betaTxt');
    let output_txt1 = $('#alphaTxt');
    var output_txt3 = $('#gammaTxt');
    var restart_btn = $('#restartBtn');
    var mode_txt = $('#modeTxt');
    var last_move = 'stay';
    output_txt2.text("-");

    let intensity = 0;
    var randomPin = Math.floor(Math.random() * 10000);

  


    $(document).on('keydown', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - intensity);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + intensity);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }


 

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }

        score_counter++;
        // current_score = score_counter;

        if (score_counter % 20 == 0) {
            // score.text(parseInt(score.text()) + 1);
            current_score++;
            // score.text(current_score);
            if (liveMode) {
                updateScore(current_score);
            }



        }
       



        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }
        //  let output_txt = document.getElementById('alphaTxt');
        let tolerance = 0.3;
        let movement = 'stay';
        let x_get = x_test; //parseFloat(output_txt1.text());
        intensity = parseInt(x_get * 16);
        if (isNaN(intensity)) {
            intensity = 0;
        } else {
            intensity = Math.abs(intensity);
        }
        let max_frame = container_width - car_width;
        // x_get += tolerance;
        // let plot_frame = 0.0  - (x_get / (tolerance * 2) * max_frame);
        if (x_get < 0) {
            movement = 'right';
            // move_right = requestAnimationFrame(right);
            // car.css('left', parseInt(car.css('left')) + 1);

            if (game_over === false && parseInt(car.css('left')) + intensity < container_width - car_width) {
                car.css('left', parseInt(car.css('left')) + intensity);
            }
        } else if (x_get > 0) {
            movement = 'left';
            // move_left = requestAnimationFrame(left);
            // car.css('left', parseInt(car.css('left')) - 1);


            if (game_over === false && parseInt(car.css('left')) - intensity > 0) {
                car.css('left', parseInt(car.css('left')) - intensity);
            }
        } else {
            movement = 'stay';
            // if (last_move === 'right') {
            // cancelAnimationFrame(move_right);
            // } else if (last_move === 'left') {
            // cancelAnimationFrame(move_left);
            // }
        }
        // let current_pos = parseInt(car.css('left'));
        // let absIntensity = Math.abs(intensity);
        // if (game_over === false &&  current_pos - absIntensity > 0 && current_pos + absIntensity < max_frame) {
        //     car.css('left', parseInt(car.css('left')) - intensity);
        // }
        output_txt3.text(String(parseInt(car.css('left'))));
        output_txt2.text(String(intensity));
        score.text(String(movement));

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        last_move = movement;
        anim_id = requestAnimationFrame(repeat);
    }

    anim_id = requestAnimationFrame(repeat);

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    restart_btn.click(function () {
        if (game_running) {
            // location.reload();
            randomPin = Math.floor(Math.random() * 10000);
            if (liveMode) {
                devRef.update({
                    stat: 'inactive',
                    pin: randomPin

                })
                    .then(function () {
                        console.log("Data updated successfully");
                    })
                    .catch(function (error) {
                        console.error("Error updating data:", error);
                    });
            }


            history.back();
        }else{
            game_running = true;
            anim_id = requestAnimationFrame(repeat);
            restart_div.hide();
            restart_btn.blur();
            game_over = false;
            devRef.update({             
                prompt: 'Bring on The Gas!'

            })
                .then(function () {
                    console.log("Data updated successfully");
                })
                .catch(function (error) {
                    console.error("Error updating data:", error);
                });

        }

    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        if(game_running){
            restart_btn.html(current_score);  
            mode_txt.text("Your Score"); 
            devRef.update({             
                prompt: 'Good Game!'

            })
                .then(function () {
                    console.log("Data updated successfully");
                })
                .catch(function (error) {
                    console.error("Error updating data:", error);
                });         
        }
        // cancelAnimationFrame(move_right);
        // cancelAnimationFrame(move_left);
        // cancelAnimationFrame(move_up);
        // cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }




    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    restart_btn.text("START");
    if(liveMode){
        mode_txt.text("LIVE MODE");
    }else{
        mode_txt.text("Online Mode");
    }
    
    stop_the_game();
});

