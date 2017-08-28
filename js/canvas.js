(function() {
    "use strict";

    function draw() {
        var canvas = document.querySelector("canvas"),
            ctx = canvas.getContext("2d"),
            fov = 300, /// Field of view kind of the lense, smaller values = spheric
            viewDist = 5, /// view distance, higher values = further away
            w = canvas.width / 2, /// center of screen
            h = canvas.height / 2,
            angle = -24, /// grid angle
            i, p1, p2, /// counter and two points (corners)
            grid = 12; /// grid size in Cartesian

        /// create vertical lines
        for (i = -grid; i <= grid; i++) {
            p1 = rotateX(i, -grid);
            p2 = rotateX(i, grid);
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
        }

        /// create horizontal lines
        for (i = -grid; i <= grid; i++) {
            p1 = rotateX(-grid, i);
            p2 = rotateX(grid, i);
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
        }
        ctx.stroke();

        function rotateX(x, y) {
            var rd, ca, sa, ry, rz, f;

            rd = angle * Math.PI / 180;
            ca = Math.cos(rd);
            sa = Math.sin(rd);

            ry = y * ca;
            rz = y * sa;

            f = fov / (viewDist + rz);
            x = x * f + w;
            y = ry * f + h;

            return [x, y];
        }
    }

    window.onload = function() {

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            draw(); 
        }
        resizeCanvas();
    };
})();