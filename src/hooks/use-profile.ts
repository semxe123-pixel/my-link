"use client";

import { useState, useEffect, useCallback } from "react";
import { DEFAULT_PROFILE, ProfileData, LinkItem } from "@/data/links";

const STORAGE_KEY = "mylink_profile_data";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  // 브라우저 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 상태 변경 시 로컬 스토리지에 자동 저장
  const saveProfile = useCallback((newProfile: ProfileData) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.error("Failed to save profile to localStorage:", e);
    }
  }, []);

  // 링크 추가
  const addLink = useCallback(
    (newLink: Omit<LinkItem, "id">) => {
      const item: LinkItem = {
        ...newLink,
        id: `link-${Date.now()}`,
      };
      const updated: ProfileData = {
        ...profile,
        links: [item, ...profile.links], // 최상단에 추가
      };
      saveProfile(updated);
      return item;
    },
    [profile, saveProfile]
  );

  // 링크 삭제
  const deleteLink = useCallback(
    (linkId: string) => {
      const updated: ProfileData = {
        ...profile,
        links: profile.links.filter((l) => l.id !== linkId),
      };
      saveProfile(updated);
    },
    [profile, saveProfile]
  );

  // 기본값 초기화
  const resetToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setProfile(DEFAULT_PROFILE);
  }, []);

  // 프로필 정보 업데이트
  const updateProfile = useCallback(
    (patch: Partial<ProfileData>) => {
      const updated: ProfileData = {
        ...profile,
        ...patch,
      };
      saveProfile(updated);
    },
    [profile, saveProfile]
  );

  return {
    profile,
    isLoaded,
    addLink,
    deleteLink,
    resetToDefault,
    updateProfile,
  };
}
