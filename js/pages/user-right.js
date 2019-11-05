const mod="user-right";
const mod_role="user-data-role";

$.fn.resetForms=function(){
    $.ajax({
	url:'backend/?data='+mod_role,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.log(resp);
	    $('#id_optrole').html('<option value="">Pilih</option>');
	    let td='';
	    for(let x in dx){
		td+='<option value="'+dx[x]['id']+'">';
		td+=dx[x]['id'];
		td+='</option>';
	    }
	    $('#id_optrole').append(td);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
}

$.fn.resetForms();


$('#id_optrole').on('change',function(){
    let role=$(this).val();
    console.log(role);

    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    fdata.append('role',role);

    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    //console.log('message: '+resp);
	    //$.fn.resetForms();
	    //$('#id-notice-content').html(resp);
	    //$('#id-notice-content').show();
	    
	    let master_data_meja=dx['master_data_meja'];if(master_data_meja=='1'){$('#id_chk_master_data_meja').attr('checked','checked');}else{$('#id_chk_master_data_meja').removeAttr('checked');}
	    let master_kategori_meja=dx['master_kategori_meja'];if(master_kategori_meja=='1'){$('#id_chk_master_kategori_meja').attr('checked','checked');}else{$('#id_chk_master_kategori_meja').removeAttr('checked');}
	    let master_daftar_menu=dx['master_daftar_menu'];if(master_daftar_menu=='1'){$('#id_chk_master_daftar_menu').attr('checked','checked');}else{$('#id_chk_master_daftar_menu').removeAttr('checked');}
	    let master_kategori_menu=dx['master_kategori_menu'];if(master_kategori_menu=='1'){$('#id_chk_master_kategori_menu').attr('checked','checked');}else{$('#id_chk_master_kategori_menu').removeAttr('checked');}
	    let master_pembayaran_non_tunai=dx['master_pembayaran_non_tunai'];if(master_pembayaran_non_tunai=='1'){$('#id_chk_master_pembayaran_non_tunai').attr('checked','checked');}else{$('#id_chk_master_pembayaran_non_tunai').removeAttr('checked');}
	    let master_menu_tambahan=dx['master_menu_tambahan'];if(master_menu_tambahan=='1'){$('#id_chk_master_menu_tambahan').attr('checked','checked');}else{$('#id_chk_master_menu_tambahan').removeAttr('checked');}
	    let penjualan_pemesanan=dx['penjualan_pemesanan'];if(penjualan_pemesanan=='1'){$('#id_chk_penjualan_pemesanan').attr('checked','checked');}else{$('#id_chk_penjualan_pemesanan').removeAttr('checked');}
	    let penjualan_pelunasan=dx['penjualan_pelunasan'];if(penjualan_pelunasan=='1'){$('#id_chk_penjualan_pelunasan').attr('checked','checked');}else{$('#id_chk_penjualan_pelunasan').removeAttr('checked');}
	    let penjualan_cetak_ulang_pelunasan=dx['penjualan_cetak_ulang_pelunasan'];if(penjualan_cetak_ulang_pelunasan=='1'){$('#id_chk_penjualan_cetak_ulang_pelunasan').attr('checked','checked');}else{$('#id_chk_penjualan_cetak_ulang_pelunasan').removeAttr('checked');}
	    let penjualan_cetak_ulang_penusanan_tanggal=dx['penjualan_cetak_ulang_penusanan_tanggal'];if(penjualan_cetak_ulang_penusanan_tanggal=='1'){$('#id_chk_penjualan_cetak_ulang_penusanan_tanggal').attr('checked','checked');}else{$('#id_chk_penjualan_cetak_ulang_penusanan_tanggal').removeAttr('checked');}
	    let penjualan_pemesanan_langsung=dx['penjualan_pemesanan_langsung'];if(penjualan_pemesanan_langsung=='1'){$('#id_chk_penjualan_pemesanan_langsung').attr('checked','checked');}else{$('#id_chk_penjualan_pemesanan_langsung').removeAttr('checked');}
	    let dapur_status_pesanan=dx['dapur_status_pesanan'];if(dapur_status_pesanan=='1'){$('#id_chk_dapur_status_pesanan').attr('checked','checked');}else{$('#id_chk_dapur_status_pesanan').removeAttr('checked');}
	    let dapur_antrian_dapur=dx['dapur_antrian_dapur'];if(dapur_antrian_dapur=='1'){$('#id_chk_dapur_antrian_dapur').attr('checked','checked');}else{$('#id_chk_dapur_antrian_dapur').removeAttr('checked');}
	    let tool_batalkan_meja=dx['tool_batalkan_meja'];if(tool_batalkan_meja=='1'){$('#id_chk_tool_batalkan_meja').attr('checked','checked');}else{$('#id_chk_tool_batalkan_meja').removeAttr('checked');}
	    let tool_batalkan_pelunasan=dx['tool_batalkan_pelunasan'];if(tool_batalkan_pelunasan=='1'){$('#id_chk_tool_batalkan_pelunasan').attr('checked','checked');}else{$('#id_chk_tool_batalkan_pelunasan').removeAttr('checked');}
	    let tool_ubah_pesanan=dx['tool_ubah_pesanan'];if(tool_ubah_pesanan=='1'){$('#id_chk_tool_ubah_pesanan').attr('checked','checked');}else{$('#id_chk_tool_ubah_pesanan').removeAttr('checked');}
	    let tool_singkronisasi=dx['tool_singkronisasi'];if(tool_singkronisasi=='1'){$('#id_chk_tool_singkronisasi').attr('checked','checked');}else{$('#id_chk_tool_singkronisasi').removeAttr('checked');}
	    let laporan_pemasukan_terakhir=dx['laporan_pemasukan_terakhir'];if(laporan_pemasukan_terakhir=='1'){$('#id_chk_laporan_pemasukan_terakhir').attr('checked','checked');}else{$('#id_chk_laporan_pemasukan_terakhir').removeAttr('checked');}
	    let laporan_bulanan=dx['laporan_bulanan'];if(laporan_bulanan=='1'){$('#id_chk_laporan_bulanan').attr('checked','checked');}else{$('#id_chk_laporan_bulanan').removeAttr('checked');}
	    let laporan_pajak=dx['laporan_pajak'];if(laporan_pajak=='1'){$('#id_chk_laporan_pajak').attr('checked','checked');}else{$('#id_chk_laporan_pajak').removeAttr('checked');}
	    let pengaturan_data_pengguna=dx['pengaturan_data_pengguna'];if(pengaturan_data_pengguna=='1'){$('#id_chk_pengaturan_data_pengguna').attr('checked','checked');}else{$('#id_chk_pengaturan_data_pengguna').removeAttr('checked');}
	    let pengaturan_hak_akses=dx['pengaturan_hak_akses'];if(pengaturan_hak_akses=='1'){$('#id_chk_pengaturan_hak_akses').attr('checked','checked');}else{$('#id_chk_pengaturan_hak_akses').removeAttr('checked');}
	    let pengaturan_biaya_lain=dx['pengaturan_biaya_lain'];if(pengaturan_biaya_lain=='1'){$('#id_chk_pengaturan_biaya_lain').attr('checked','checked');}else{$('#id_chk_pengaturan_biaya_lain').removeAttr('checked');}
	    let pengaturan_histori_batal_meja=dx['pengaturan_histori_batal_meja'];if(pengaturan_histori_batal_meja=='1'){$('#id_chk_pengaturan_histori_batal_meja').attr('checked','checked');}else{$('#id_chk_pengaturan_histori_batal_meja').removeAttr('checked');}
	    let pengaturan_ubah_order=dx['pengaturan_ubah_order'];if(pengaturan_ubah_order=='1'){$('#id_chk_pengaturan_ubah_order').attr('checked','checked');}else{$('#id_chk_pengaturan_ubah_order').removeAttr('checked');}

	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });    
});
