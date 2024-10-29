import { apiSlice } from './apiSlice';
import { LOYALTY_URL } from '../constants';

export const loyaltyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyHistory: builder.query({
      query: () => `${LOYALTY_URL}/history`,  // Replace with your actual loyalty API endpoint
    }),
    addLoyaltyReward: builder.mutation({
      query: (rewardItem) => ({
        url: `${LOYALTY_URL}/redeem`,  // Replace with your actual loyalty redeem API endpoint
        method: 'POST',
        body: rewardItem,
      }),
    }),
  }),
});

export const { useGetLoyaltyHistoryQuery, useAddLoyaltyRewardMutation } = loyaltyApiSlice;
