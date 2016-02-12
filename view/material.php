<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Материалы</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover table-condensed">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <form action="<?=FPATH?>page/add/material" method="post">
                <tr>
                    <td>
                        <div class="form-group">
                            <input type="text" class="form-control" name="material" data-name="add" placeholder="Введите название материала...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
            <?php foreach($params as $value){?>
                    <tr data-name="material">
                        <td><input type="text" class="form-control" name="material" disabled data-path="<?=FPATH?>page/edit/material/id_material/<?=$value['id_material']?>" value="<?=$value['material']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#modal">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#modal">Редактировать</button>
                        </td>
                    </tr>
            <?php }?>
        </table>
    </div>
</div>

<?=$content?>