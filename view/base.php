<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?=$title?></title>
    <link href="<?=FPATH?>assets/bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?=FPATH?>assets/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.min.css" rel="stylesheet">
    <link href="<?=FPATH?>assets/bootstrap-select-1.9.4/dist/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="<?=FPATH?>assets/style.css" rel="stylesheet">
    <script src="<?=FPATH?>assets/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
    <script src="<?=FPATH?>assets/jquery/jquery.maskedinput.min.js"  type="text/javascript"></script>
    <script src="<?=FPATH?>assets/bootstrap-3.3.6-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="<?=FPATH?>assets/bootstrap-datepicker-master/dist/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="<?=FPATH?>assets/bootstrap-select-1.9.4/dist/js/bootstrap-select.min.js" type="text/javascript"></script>
    <script src="<?=FPATH?>assets/jquery.maskedinput.min.js" type="text/javascript"></script>
    <script src="<?=FPATH?>assets/script.js" type="text/javascript"></script>
</head>
<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="http://www.partner98.ru/">
                    <img alt="Brand" src="<?=FPATH?>img/Logotip.jpg" height="35" width="56">
                </a>
            </div>
        </div>
    </nav>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="<?=FPATH?>page/index">На главную</a></li>
                    <li><a href="<?=FPATH?>page/form_repair/repair/add">Добавить новый документ <span class="sr-only">(current)</span></a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Справочники<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="<?=FPATH?>page/open/client">Клиенты</a></li>
                            <li><a href="<?=FPATH?>page/open/type">Типы устройств</a></li>
                            <li><a href="<?=FPATH?>page/open/brend">Производители</a></li>
                            <li><a href="<?=FPATH?>page/open/location">Подразделения</a></li>
                            <li><a href="<?=FPATH?>page/open/material">Материалы</a></li>
                            <li><a href="<?=FPATH?>page/open/work">Виды работ и цены</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Выход</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <?=$content?>
</body>
</html>