export interface Barang {
  barang_id?: number;
  barang_nama: string;
  harga_beli: number;
  harga_jual: number;
  transaksi: string | null | File;
}
