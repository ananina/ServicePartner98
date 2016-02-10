<div class="panel panel-default panel2">
    <div class="panel-heading">
        <h3 class="panel-title">Работы и цены</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование работы</td>
                <td>Цена, руб.</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                <form action="<?=FPATH?>page/edit/works/id_work/<?=$value['id_work']?>" method="post">
                    <tr>
                        <td><input type="text" class="form-control" name="work" value="<?=$value['work']?>"></td>
                        <td><input type="text" class="form-control" name="price" value="<?=$value['price']?>"></td>
                        <td>
                            <input type="submit" name="button" class="btn btn-default" value="Удалить">
                            <input type="submit" name="button" class="btn btn-default" value="Изменить">
                        </td>
                    </tr>
                </form>
            <?php }?>
            <form action="<?=FPATH?>page/add/works" method="post">
                <tr>
                    <td><input type="text" class="form-control" name="work"></td>
                    <td><input type="text" class="form-control" name="price"></td>
                    <td><input type="submit" class="btn btn-default" value="Добавить"></td>
                </tr>
            </form>
        </table>
    </div>
</div>

