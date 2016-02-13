<div class="panel panel-default panel1" >
    <div class="panel-heading">
        <h3 class="panel-title">Производители</h3>
    </div>
    <div class="panel-body">
        <table class="table table-condensed">
            <tr>
                <td>Наименование</td>
                <td></td>
            </tr>
            <tr colspan="2">
                    <table class="table table-hover table-condensed">
                        <form action="<?=FPATH?>page/add/brend" method="post">
                            <tr>
                                <td><div class="form-group">
                                        <input type="text" class="form-control" name="brend" data-name="add" placeholder="Введите название производителя...">
                                    </div>
                                </td>
                                <td><input type="submit" class="btn btn-default btnAdd" value="Добавить">
                                    <span class="text-danger " hidden>Нечего добавлять!!!</span>
                                </td>
                            </tr>
                        </form>

                        <?php foreach($params as $value){?>
                            <tr data-name="brend">
                                <td><input type="text" class="form-control" name="brend" disabled value="<?=$value['brend']?>"</td>
                                <td>
                                    <button class="btn btn-default btnRemove" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/delete/brend/id_brend/<?=$value['id_brend']?>">Удалить</button>
                                    <button class="btn btn-default btnEdit" data-toggle="modal" data-target="#modal" data-path="<?=FPATH?>page/edit/brend/id_brend/<?=$value['id_brend']?>">Редактировать</button>
                                </td>
                            </tr>
                        <?php }?>
                    </table>
            </tr>
        </table>
    </div>
</div>

<?=$content?>