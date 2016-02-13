<div class="panel panel-default panel2">
    <div class="panel-heading">
        <h3 class="panel-title">Работы и цены</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover table-condensed">
            <tr>
                <td>Наименование работы</td>
                <td>Цена, руб.</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/work" method="post">
                <tr>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="work" data-name="add" placeholder="Введите название работы...">
                        </div>
                    </td>
                    <td><div class="form-group">
                            <input type="text" class="form-control" name="price" data-name="add" placeholder="Введите цену работы...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="work">
                        <td><input type="text" class="form-control" name="work" disabled value="<?=$value['work']?>"></td>
                        <td><input type="text" class="form-control" name="price" disabled value="<?=$value['price']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/delete/work/id_work/<?=$value['id_work']?>">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/edit/work/id_work/<?=$value['id_work']?>">Редактировать</button>
                        </td>
                    </tr>
            <?php }?>
        </table>
    </div>
</div>

<?=$content?>