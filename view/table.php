<table class="table table-hover">
    <tr>
        <td>№</td>
        <td>Дата</td>
        <td>Тип</td>
        <td>Статус</td>
        <td>Ф.И.О.</td>
        <td>Адрес</td>
        <td>Телефон</td>
        <td>Производитель</td>
        <td>Модель</td>
        <td>Подразделение</td>
        <td>Мастер</td>
    </tr>


<?php foreach($params as $value){?>
    <a href="<?=FPATH?>page/open_repair/repair/<?=$value['id']?>">
        <tr>
            <td><?=$value['number']?></td>
            <td><?=$value['date_begin']?></td>
            <?php $id_type = $value['id_type'];
            foreach($types as $type){
                if($type['id_type'] == $id_type){?>
                    <td><?=$type['type']?></td>
                <?php }
            }?>
            <?php $id_status = $value['id_status'];
            foreach($statuses as $status){
                if($status['id_status'] == $id_status){?>
                    <td><?=$status['status']?></td>
                <?php }
            }?>
            <?php $id_client = $value['id_client'];
            foreach($clients as $client){
                if($client['id_client'] == $id_client){?>
                    <td><?=$client['client']?></td>
                    <td><?=$client['address']?></td>
                    <td><?=$client['tel']?></td>
                <?php }
            }?>
            <?php $id_brend = $value['id_brend'];
            foreach($brends as $brend){
                if($brend['id_brend'] == $id_brend){?>
                    <td><?=$brend['brend']?></td>
                <?php }
            }?>
            <td><?=$value['model']?></td>
            <?php $id_location = $value['id_location'];
            foreach($locations as $location){
                if($location['id_location'] == $id_location){?>
                    <td><?=$location['location']?></td>
                <?php }
            }?>
            <?php $id_user = $value['id_user'];
            foreach($users as $user){
                if($user['id_user'] == $id_user){?>
                    <td><?=$user['user']?></td>
                <?php }
            }?>
        </tr></a>
<?php } ?>
</table>