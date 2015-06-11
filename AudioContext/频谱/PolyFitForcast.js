function PolyFitForcast() {
    /**
     * <p>
     * 函数功能：最小二乘法曲线拟合
     * </p>
     * <p>
     * 方程:Y = a(0) + a(1) * (X - X1)+ a(2) * (X - X1)^2 + ..... .+ a(m) * (X -
     * X1)^m X1为X的平均数
     * </p>
     * 
     * @param x
     *            实型一维数组,长度为 n. 存放给定 n 个数据点的 X 坐标
     * @param y
     *            实型一维数组,长度为 n.存放给定 n 个数据点的 Y 坐标
     * @param n
     *            变量。给定数据点的个数
     * @param a
     *            实型一维数组，长度为 m.返回 m-1 次拟合多项式的 m 个系数
     * @param m
     *            拟合多项式的项数，即拟合多项式的最高次数为 m-1. 要求 m<=n 且m<=20。若 m>n 或 m>20
     *            ，则本函数自动按 m=min{n,20} 处理.
     *            <p>
     *            Date:2007-12-25 16:21 PM
     *            </p>
     * @author qingbao-gao
     * @return 多项式系数存储数组
     */
    function PolyFit(x, y, n, a, m) {
        var i, j, k;
        var z, p, c, g, q = 0, d1, d2;
        var s = new Array(20);
        var t = new Array(20);
        var b = new Array(20);
        var dt = new Array(3);
        for (i = 0; i <= m - 1; i++) {
            a[i] = 0.0;
        }
        if (m > n) {
            m = n;
        }
        if (m > 20) {
            m = 20;
        }
        z = 0.0;
        for (i = 0; i <= n - 1; i++) {
            z = z + x[i] / (1.0 * n);
        }
        b[0] = 1.0;
        d1 = 1.0 * n;
        p = 0.0;
        c = 0.0;
        for (i = 0; i <= n - 1; i++) {
            p = p + (x[i] - z);
            c = c + y[i];
        }
        c = c / d1;
        p = p / d1;
        a[0] = c * b[0];
        if (m > 1) {
            t[1] = 1.0;
            t[0] = -p;
            d2 = 0.0;
            c = 0.0;
            g = 0.0;
            for (i = 0; i <= n - 1; i++) {
                q = x[i] - z - p;
                d2 = d2 + q * q;
                c = c + y[i] * q;
                g = g + (x[i] - z) * q * q;
            }
            c = c / d2;
            p = g / d2;
            q = d2 / d1;
            d1 = d2;
            a[1] = c * t[1];
            a[0] = c * t[0] + a[0];
        }
        for (j = 2; j <= m - 1; j++) {
            s[j] = t[j - 1];
            s[j - 1] = -p * t[j - 1] + t[j - 2];
            if (j >= 3)
                for (k = j - 2; k >= 1; k--) {
                    s[k] = -p * t[k] + t[k - 1] - q * b[k];
                }
            s[0] = -p * t[0] - q * b[0];
            d2 = 0.0;
            c = 0.0;
            g = 0.0;
            for (i = 0; i <= n - 1; i++) {
                q = s[j];
                for (k = j - 1; k >= 0; k--) {
                    q = q * (x[i] - z) + s[k];
                }
                d2 = d2 + q * q;
                c = c + y[i] * q;
                g = g + (x[i] - z) * q * q;
            }
            c = c / d2;
            p = g / d2;
            q = d2 / d1;
            d1 = d2;
            a[j] = c * s[j];
            t[j] = s[j];
            for (k = j - 1; k >= 0; k--) {
                a[k] = c * s[k] + a[k];
                b[k] = t[k];
                t[k] = s[k];
            }
        }
        dt[0] = 0.0;
        dt[1] = 0.0;
        dt[2] = 0.0;
        for (i = 0; i <= n - 1; i++) {
            q = a[m - 1];
            for (k = m - 2; k >= 0; k--) {
                q = a[k] + q * (x[i] - z);
            }
            p = q - y[i];
            if (Math.abs(p) > dt[2]) {
                dt[2] = Math.abs(p);
            }
            dt[0] = dt[0] + p * p;
            dt[1] = dt[1] + Math.abs(p);
        }
        return a;
    }// end

    /**
     * <p>
     * 对X轴数据节点球平均值
     * </p>
     * 
     * @param x
     *            存储X轴节点的数组
     *            <p>
     *            Date:2007-12-25 20:21 PM
     *            </p>
     * @author qingbao-gao
     * @return 平均值
     */
    function average(x) {
        var ave = 0;
        var sum = 0;
        if (x !== null) {
            for (var i = 0; i < x.length; i++) {
                sum += x[i];
            }
            ave = sum / x.length;
        }
        return ave;
    }

    /**
     * <p>
     * 由X值获得Y值
     * </p>
     * @param x
     *            当前X轴输入值,即为预测的月份
     * @param xx
     *            当前X轴输入值的前X数据点
     * @param a
     *            存储多项式系数的数组
     * @param m
     *            存储多项式的最高次数的数组
     *            <p>
     *            Date:2007-12-25 PM 20:07
     *            </p>
     * @return 对应X轴节点值的Y轴值
     */
    function getY(x, xx, a, m) {
        var y = 0;
        var ave = average(xx);

        var l = 0;
        for (var i = 0; i < m; i++) {
            l = a[0];
            if (i > 0) {
                y += a[i] * Math.pow((x - ave), i);
            }
        }
        return (y + l);
    }

    /**
     * 返回拟合后的点坐标数组
     * @param  {Array} arr 点坐标数组
     * @return {Array}     拟合后的点坐标数组
     */
    this.get = function(arr) {
        var arrX = [], arrY = [];
        
        for (var i = 0; i < arr.length; i++) {
            arrX.push(arr[i].x);
            arrY.push(arr[i].y);
        }
        
        var len = arrY.length;
        var m = 3;
        var a = new Array(arrX.length);
        var aa = PolyFit(arrX, arrY, len, a, m);
        var arrRes = [];
        for(var i = 0; i < len; i++){
           arrRes.push({x: arrX[i], y: getY(arrX[i], arrX, aa, m)});
        }

        return arrRes;
    };
}

// new PolyFitForcast().get();