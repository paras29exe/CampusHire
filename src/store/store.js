// import zustand from 'zustand';
import { create } from 'zustand';

export const useJobsStore = create((set) => ({
    activeJobs: [],
    setActiveJobs: (jobs) => set({ activeJobs: jobs }),
    appliedJobs: [],
    setAppliedJobs: (jobs) => set({ appliedJobs: jobs }),
    shortlistedJobs: [],
    setShortlistedJobs: (jobs) => set({ shortlistedJobs: jobs }),
    expiredJobs: [],
    setExpiredJobs: (jobs) => set({ expiredJobs: jobs }),

    unpublishedJobs: [],
    setUnpublishedJobs: (jobs) => set({ unpublishedJobs: jobs }),
    unassignedJobs: [],
    setUnassignedJobs: (jobs) => set({ unassignedJobs: jobs }),
}));

export const useAuthStore = create((set) => ({
    userData: null,
    setUserData: (data) => set({ userData: data }),
    role: null,
    setRole: (role) => set({ role })
}));

export const useApiStore = create((set) => ({
    pageLoading: false,
    setPageLoading: (pageLoading) => set({ pageLoading }),
    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
}))

