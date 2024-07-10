import { UserService } from "../services/user";
import db from "../database/dbConfig";
import { mockLanguages, mockRepos, mockUser } from "./__mocks__/types";

// Mock the db module
jest.mock("../database/dbConfig", () => ({
  one: jest.fn(),
  none: jest.fn(),
  any: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  it("should add a user, languages, and repositories", async () => {
    
    await userService.addUser(mockUser, mockLanguages, mockRepos);

    expect(db.one).toHaveBeenCalledWith(
      expect.any(String), 
      expect.objectContaining(mockUser)
    );
    mockLanguages.forEach((language) => {
      expect(db.none).toHaveBeenCalledWith(
        expect.any(String), 
        expect.objectContaining({
          user_id: mockUser.id,
          language,
        }));
    });
    mockRepos.forEach((repo) => {
      expect(db.none).toHaveBeenCalledWith(
        expect.any(String), 
        expect.objectContaining({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          is_private: repo.private,
          user_id: mockUser.id,
        }));
    });
  });

  it("should get all users with their languages", async () => {
    const mockDbResult = [
      { ...mockUser, languages: mockLanguages },
    ];

    (db.any as jest.Mock).mockResolvedValue(mockDbResult);
    
    const result = await userService.getAllUser();
    
    expect(result).toEqual(mockDbResult);
  });

  it("should get all users by location with their languages", async () => {
    const mockDbResult = [
      { ...mockUser, languages: mockLanguages },
    ];

    (db.any as jest.Mock).mockResolvedValue(mockDbResult);

    const result = await userService.getAllUserbyLocation("Portugal");
    
    expect(db.any).toHaveBeenCalledWith(
      expect.stringContaining("WHERE users.location ILIKE"), 
      { location: "%Portugal%" }
    );
    expect(result).toEqual(mockDbResult);
  });

  it("should get all users by language with their languages", async () => {
    const mockDbResult = [
      { ...mockUser, languages: mockLanguages },
    ];

    (db.any as jest.Mock).mockResolvedValue(mockDbResult);

    const result = await userService.getAllUserbyLanguage("JavaScript");

    expect(db.any).toHaveBeenCalledWith(
      expect.stringContaining("WHERE user_languages.language ILIKE"), 
      { language: "%JavaScript%" }
    );
    expect(result).toEqual(mockDbResult);
  });
});