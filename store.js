import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create()(
  persist(
    (set, get) => ({
      items: [
        {
          id: "1",
          userId: 10,
          title: "Kera-08 Platform Mary Janes",
          price: 70,
          size: "L",
          brand: "Demonias",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 21,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "women",
          category: "shoes",
          style: "goth",
        },
        {
          id: "2",
          userId: 10,
          title: "Bondage Trousers (Red Tartan)",
          price: 25,
          size: "32W",
          brand: "Tiger of London",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 24,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "non-binary",
          category: "trousers",
          style: "punk",
        },
        {
          id: "3",
          userId: 10,
          title: "Distressed Knit Sweater",
          price: 35,
          size: "L",
          brand: "Killstar",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 87,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "non-binary",
          category: "sweaters",
          style: "mall-goth",
        },
        {
          id: "4",
          userId: 20,
          title: "Spike Studded Leather Biker Jacket",
          price: 80,
          size: "M",
          brand: "Straight To Hell",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 27,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "men",
          category: "jackets",
          style: "punk",
        },
        {
          id: "5",
          userId: 20,
          title: "Velvet Corset with Lace Trim",
          price: 45,
          size: "XS",
          brand: "Dark in Love",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 68,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "women",
          category: "tops",
          style: "goth",
        },
        {
          id: "6",
          userId: 30,
          title: "Oversized Striped Mohair Cardigan",
          price: 25,
          size: "XL",
          brand: "Unif",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 17,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "non-binary",
          category: "sweaters",
          style: "emo",
        },
        {
          id: "7",
          userId: 30,
          title: "Bat-Wing Buckle Combat Boots",
          price: 35,
          size: "10 (Men)",
          brand: "TUK Footwear",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 1,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "men",
          category: "shoes",
          style: "goth",
        },
        {
          id: "8",
          userId: 40,
          title: "Skull-Buckle Western Belt",
          price: 15,
          size: "34",
          brand: "Cold Shoulder",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "non-binary",
          category: "accessories",
          style: "emo",
        },
        {
          id: "9",
          userId: 40,
          title: "Pinstripe Beetlejuice Blazer",
          price: 45,
          size: "L",
          brand: "Foxblood",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76",
          likes: 31,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "women",
          category: "jackets",
          style: "mall-goth",
        },
        {
          id: "10",
          userId: 10,
          title: "Pentagram Harness Bra",
          price: 10,
          size: "OS",
          brand: "Marie Mur",
          image: "https://placehold.co/2000x2000/9F8C76/9F8C76/9F8C76/9F8C76",
          likes: 23,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          viewed: false,
          gender: "women",
          category: "accessories",
          style: "goth",
        },
      ],
      users: [
        {
          id: 10,
          username: "luca_mathuse",
          avatar: "https://placehold.co/100x100",
        },
        {
          id: 20,
          username: "punk_drifter",
          avatar: "https://placehold.co/100x100",
        },
        {
          id: 30,
          username: "emo_kid_99",
          avatar: "https://placehold.co/100x100",
        },
        {
          id: 40,
          username: "vintage_vibe",
          avatar: "https://placehold.co/100x100",
        },
        {
          id: 50,
          username: "dark_aesthetic",
          avatar: "https://placehold.co/100x100",
        },
      ],
      // 1. Initialize an empty array for liked items
      likedIds: [],
      searchQuery: "", // Add this

      setSearchQuery: (query) => set({ searchQuery: query }), // Add this
      addItem: (newItem) =>
        set((state) => ({ items: [newItem, ...state.items] })),

      deleteItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      // 2. Action to toggle a like
      toggleLike: (id) => {
        const { likedIds } = get();
        const isLiked = likedIds.includes(id);

        if (isLiked) {
          // Remove from likes
          set({ likedIds: likedIds.filter((likedId) => likedId !== id) });
        } else {
          // Add to likes
          set({ likedIds: [...likedIds, id] });
        }
      },

      // 3. Computed selector to get the full objects of liked items
      getLikedItems: () => {
        const state = get();
        return state.items.filter((item) => state.likedIds.includes(item.id));
      },
      markAsViewed: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, viewed: true } : item,
          ),
        })),
      isUploadModalOpen: false,
      setUploadModalOpen: (open) => set({ isUploadModalOpen: open }),
    }),

    {
      name: "alternatly-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
    },
  ),
);
