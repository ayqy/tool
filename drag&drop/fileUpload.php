<?php
// 从$_FILES中取，而不是$_POST
$file = $_FILES['myfile'];


$fileName = $file['name'];
// echo $fileName;
$fileSize = $file['size'];
// echo $fileSize;
if ($fileName != "") {
    $rand = rand(100, 999);
    $pics = date("YmdHis") . $rand . $fileName;
    //上传路径
    $filePath = "files/". $pics;
    /* tmp_name是定死的，php出于服务器安全性考虑，过滤文件名 */
    if (move_uploaded_file($_FILES['myfile']["tmp_name"], $filePath)) {
        echo $filePath;
    }
}
?>