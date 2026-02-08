import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk<TOrdersData>(
  'feed/getFeeds',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);
