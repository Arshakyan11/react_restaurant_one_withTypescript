import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sliceDataForPage } from "../../helpers/sliceData";
import { RootState } from "../store";
import { DataOflittleMenuType } from "../../types";

interface PaginationDataRcvingType {
  data: DataOflittleMenuType[];
  postsPerPage: number;
  currentPage: number;
}

interface PagionationSliceType {
  postsPerPage: number;
  currentPage: number;
  dataRcving: DataOflittleMenuType[];
  slicedData: DataOflittleMenuType[];
}

const initialState: PagionationSliceType = {
  dataRcving: [],
  slicedData: [],
  postsPerPage: 0,
  currentPage: 0,
};

const PagionationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setInfoAboutPagination: (
      state,
      action: PayloadAction<PaginationDataRcvingType>
    ) => {
      const rcvInfo = action.payload;
      state.dataRcving = rcvInfo.data;
      state.postsPerPage = rcvInfo.postsPerPage;
      state.currentPage = rcvInfo.currentPage;
      state.slicedData = sliceDataForPage(
        rcvInfo.data,
        rcvInfo.currentPage,
        rcvInfo.postsPerPage
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.slicedData = sliceDataForPage(
        state.dataRcving,
        action.payload,
        state.postsPerPage
      );
    },
  },
});

export default PagionationSlice.reducer;
export const { setInfoAboutPagination, setCurrentPage } =
  PagionationSlice.actions;
export const getAllPagination = (state: RootState) => state.pagination;
