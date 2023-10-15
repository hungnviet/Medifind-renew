import { API } from "../base";

export interface IMedicine extends IAntibiotics {
  tenThuoc: string;
  soDangKy: string;
  thongTinDangKyThuoc: {
    ngayCapSoDangKy: string;
    ngayGiaHanSoDangKy: string;
    ngayHetHanSoDangKy: string;
    soQuyetDinh: string;
    urlSoQuyetDinh: string;
    dotCap: string;
  };
  thongTinThuocCoBan: {
    hoatChatHamLuong: string;
    hoatChatChinh: string;
    hoatChatChinhId: string;
    hamLuong: string;
    dangBaoChe: string;
    dangBaoCheId: number;
    dongGoi: string;
    dongGoiJson: string;
    maDuongDung: string;
    tenDuongDung: string;
    tieuChuan: string;
    tieuChuanId: number;
    tuoiTho: string;
    loaiThuoc: string;
    loaiThuocId: string;
    nhomThuoc: string;
    nhomThuocId: string;
  };
  congTySanXuat: {
    tenCongTySanXuat: string;
    diaChiSanXuat: string;
    nuocSanXuat: string;
    nuocSanXuatId: number;
  };
  phanLoaiThuocEnum: number;
  ghiChu: string;
  isActive: true;
  id: string;
}

export interface IDrugBankMedicine extends IAntibiotics {
  drugbank_id: string;
  name: string;
  type: string;
  groups: string;
  atc_codes: string;
  categories: string;
  inchikey: string;
  inchi: string;
  description: string;
}

export interface IAntibiotics {
  isAntibiotics: boolean;
  antibioticsData: {
    sideEffects: string[];
  };
}

export enum DatabaseSource {
  VIETNAM = "vietnam",
  OTHERS = "drugbank",
}

/**
 * Get Medicine Id function without database information
 * @param medicine Medicine Data
 */
export function getMedicineIdentifier(
  medicine: IMedicine | IDrugBankMedicine
): string {
  return (
    (medicine as IMedicine).id || (medicine as IDrugBankMedicine).drugbank_id
  );
}

export interface IScanResult {
  boundingBox: string;
  medicine: {
    item: IMedicine & IDrugBankMedicine;
  };
}

const scanApi = API.injectEndpoints({
  endpoints: (build) => ({
    scanPrescription: build.mutation<IScanResult[], FormData>({
      query: (data) => ({
        url: "scan/upload?database=vietnam",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useScanPrescriptionMutation } = scanApi;