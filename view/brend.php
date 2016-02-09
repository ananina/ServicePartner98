<div class="panel panel-default panel1" >
    <div class="panel-heading">
        <h3 class="panel-title">Производители</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                <form action="<?=FPATH?>page/edit/brend/id_brend/<?=$value['id_brend']?>" method="post">
                    <tr>
                        <td><input type="text" class="form-control" name="brend" value="<?=$value['brend']?>"</td>
                        <td>
                            <input type="submit" class="btn btn-default" name="button" value="Удалить">
                            <input type="submit" class="btn btn-default" name="button" value="Изменить">
                        </td>
                    </tr>
                </form>
            <?php }?>
            <form action="<?=FPATH?>page/add/brend" method="post">
                <tr>
                    <td><input type="text"class="form-control" name="brend"></td>
                    <td><input type="submit" class="btn btn-default" value="Добавить"></td>
                </tr>
            </form>
        </table>
    </div>
</div>

