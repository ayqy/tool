window.Bezier = {
    /**
     * 获取控制点坐标
     * @param  {Array} arr 4个点坐标数组
     * @param  {Float} smooth_value [0, 1] 平滑度
     *   p1 上一个点
     *   p2 左端点
     *   P3 右端点
     *   p4 下一个点
     * @return {Array}     2个点坐标数组
     */
    getControlPoints: function(arr, smooth_value) {
        var x0 = arr[0].x, y0 = arr[0].y;
        var x1 = arr[1].x, y1 = arr[1].y;
        var x2 = arr[2].x, y2 = arr[2].y;
        var x3 = arr[3].x, y3 = arr[3].y;

        // Assume we need to calculate the control
        // points between (x1,y1) and (x2,y2).
        // Then x0,y0 - the previous vertex,
        //      x3,y3 - the next one.

        var xc1 = (x0 + x1) / 2.0;
        var yc1 = (y0 + y1) / 2.0;
        var xc2 = (x1 + x2) / 2.0;
        var yc2 = (y1 + y2) / 2.0;
        var xc3 = (x2 + x3) / 2.0;
        var yc3 = (y2 + y3) / 2.0;

        var len1 = Math.sqrt((x1-x0) * (x1-x0) + (y1-y0) * (y1-y0));
        var len2 = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
        var len3 = Math.sqrt((x3-x2) * (x3-x2) + (y3-y2) * (y3-y2));

        var k1 = len1 / (len1 + len2);
        var k2 = len2 / (len2 + len3);

        var xm1 = xc1 + (xc2 - xc1) * k1;
        var ym1 = yc1 + (yc2 - yc1) * k1;

        var xm2 = xc2 + (xc3 - xc2) * k2;
        var ym2 = yc2 + (yc3 - yc2) * k2;

        // Resulting control points. Here smooth_value is mentioned
        // above coefficient K whose value should be in range [0...1].
        var ctrl1_x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
        var ctrl1_y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;

        var ctrl2_x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
        var ctrl2_y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;

        return [{x: ctrl1_x, y: ctrl1_y}, {x: ctrl2_x, y: ctrl2_y}];
    }
};