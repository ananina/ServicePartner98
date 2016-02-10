<div class="panel panel-default panel1">
    <div class="panel-heading">
        <h3 class="panel-title">Материалы</h3>
    </div>
    <div class="panel-body">
        <table class="table table-hover table-editMaterials">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <?php foreach($params as $value){?>
                <form action="<?=FPATH?>page/edit/material/id_material/<?=$value['id_material']?>" method="post">
                    <tr>
                        <td><input type="text" class="form-control" name="material" disabled data-id="<?=$value['id_material']?>" value="<?=$value['material']?>"></td>
                        <td>
                            <button class="btn btn-default btnRemoveMaterial" data-toggle="modal" data-target="#removeMaterialModal">Удалить</button>
                            <button class="btn btn-default btnEditMaterial" data-toggle="modal" data-target="#editMaterialModal">Редактировать</button>
                        </td>
                    </tr>
                </form>
            <?php }?>
            <form action="<?=FPATH?>page/add/material" method="post">
                <tr id="newMaterial">
                    <td>
                        <div class="form-group">
                            <input type="text" class="form-control" name="material" data-name="newMaterial" placeholder="Введите название материала...">
                        </div>
                    </td>
                    <td><input type="submit" class="btn btn-default btnAddMaterial" value="Добавить">
                        <span class="text-danger " hidden>Нечего добавлять!!!</span>
                    </td>
                </tr>
            </form>
        </table>
    </div>
</div>

<!-- Modal -->
<form action="<?=FPATH?>page/edit/material/id_material/" method="post">
<div class="modal fade" id="editMaterialModal" tabindex="-1" role="dialog" aria-labelledby="editMaterialLabel" aria-hidden="true">
    <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="editMaterialLabel">Редактирование</h4>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                    <input type="submit" name="button" class="btn btn-default" value="Сохранить изменения">
                </div>
            </div>
    </div>
</div>
</form>

<form action="<?=FPATH?>page/edit/material/id_material/" method="post">
    <div class="modal fade" id="removeMaterialModal" tabindex="-1" role="dialog" aria-labelledby="removeMaterialLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="removeMaterialLabel">Удаление</h4>
                </div>
                <div class="modal-body">
                    Вы уверены, что хотите удалить эту позицию?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                    <input type="submit" name="button" class="btn btn-default" value="Удалить">
                </div>
            </div>
        </div>
    </div>
</form>