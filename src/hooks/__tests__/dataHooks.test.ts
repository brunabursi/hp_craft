import { renderHook } from "@testing-library/react";
import { getFetcherParamsByFilter, getCharacterById } from "../dataHooks";
import { Filter } from "@/api/types";
import { mockCharacters } from "@/mocks/characterMocks";
import * as api from "@/api/api";
import useSWR from "swr";

// Mock the SWR hook
jest.mock("swr");

// Mock the API functions
jest.mock("@/api/api", () => ({
  fetchCharacters: jest.fn(),
  fetchCharacterById: jest.fn(),
  fetchHogwartsStudents: jest.fn(),
  fetchHogwartsStaff: jest.fn(),
  fetchHouseMembers: jest.fn(),
  fetchFavoriteCharacters: jest.fn(),
}));

describe("getFetcherParamsByFilter", () => {
  it("should return favorite fetcher when filter is Favorite", () => {
    const result = getFetcherParamsByFilter(Filter.Favorite);
    expect(result.swrKey).toBe("favorite");
    expect(result.fetcher).toBe(api.fetchFavoriteCharacters);
  });

  it("should return students fetcher when filter is Students", () => {
    const result = getFetcherParamsByFilter(Filter.Students);
    expect(result.swrKey).toBe("students");
    expect(result.fetcher).toBe(api.fetchHogwartsStudents);
  });

  it("should return staff fetcher when filter is Staff", () => {
    const result = getFetcherParamsByFilter(Filter.Staff);
    expect(result.swrKey).toBe("staff");
    expect(result.fetcher).toBe(api.fetchHogwartsStaff);
  });

  it("should return house members fetcher when filter is HouseMembers", () => {
    const result = getFetcherParamsByFilter(Filter.HouseMembers);
    expect(result.swrKey).toBe("house");
    expect(result.fetcher).toBe(api.fetchHouseMembers);
  });
});

describe("getCharacterById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return character data when successful", async () => {
    const mockCharacter = mockCharacters[0];

    // Mock the useSWR implementation for this test
    (useSWR as jest.Mock).mockReturnValue({
      data: [mockCharacter],
      error: undefined,
      isLoading: false,
    });

    // Mock the fetchCharacterById function
    (api.fetchCharacterById as jest.Mock).mockResolvedValue([mockCharacter]);

    const { result } = renderHook(() => getCharacterById(mockCharacter.id));

    expect(result.current.character).toEqual([mockCharacter]);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(useSWR).toHaveBeenCalledWith(
      `character-${mockCharacter.id}`,
      expect.any(Function)
    );
  });

  it("should return error when API call fails", () => {
    const error = new Error("Failed to fetch");

    // Mock the useSWR implementation for this test
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error,
      isLoading: false,
    });

    const { result } = renderHook(() => getCharacterById("invalid-id"));

    expect(result.current.character).toBeUndefined();
    expect(result.current.error).toBe(error);
    expect(result.current.isLoading).toBe(false);
  });

  it("should return isLoading as true when data is being fetched", () => {
    // Mock the useSWR implementation for this test
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => getCharacterById("loading-id"));

    expect(result.current.character).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
  });
});
