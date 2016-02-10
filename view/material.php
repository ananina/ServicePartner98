<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Материалы</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                    <tr data-name="material">
                        <td><input type="text" class="form-control" name="material" disabled data-path="<?=FPATH?>page/edit/material/id_material/<?=$value['id_material']?>" value="<?=$value['material']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#removeModal">Удалить</button>
                            <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#editModal">Редактировать</button>
                        </td>
                    </tr>
            <?php }?>
            <form action="<?=FPATH?>page/add/material" method="post">
                <tr data-name="newMaterial">
                    <td>
                        <div class="form-group">
                            <input type="text" class="form-control" name="material" data-name="newMaterial" placeholder="Введите название материала...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
        </table>
    </div>
</div>

<?=$content?>