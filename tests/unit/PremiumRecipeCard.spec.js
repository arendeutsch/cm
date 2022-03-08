import { createLocalVue, shallowMount } from "@vue/test-utils";
import PremiumRecipeCard from "../../src/components/PremiumRecipeCard/PremiumRecipeCard";

describe("PremiumRecipeCard.vue", () => {
  let localVue;
  let user;
  let recipe;

  beforeEach(() => {
    localVue = createLocalVue();
    user = {
      firstName: "Jon",
      lastName: "Doe",
      email: "jon.doe@carbmanager.com",
      energyUnits: "calories"
    };
    recipe = {
      id: "1",
      isPremium: true,
      isPublished: true,
      isDeleted: false,
      status: "ok",
      title:
        "Low Carb Buffalo Chicken Mac And Cheese W Smashed Cauliflower Medallions",
      images: [
        {
          id: "1:img",
          url:
            "https://images.carbmanager.com/iYKrSEf7P6EAGx3desxGmcPJTVea2lJoBiXom24tevA/resize:fit:535/L2Fzc2V0cy5jYXJibWFuYWdlci5jb20vby91c2VyJTJGNGdkMlJoRVpqM2NGR1NKWDVuYjhFQzROWjBEMiUyRmltYWdlcyUyRmJiNmExNjY4LTU1NDMtNGE3Ny1hMDQ0LWQ0ODVhM2U0ZDMwNS5qcGc_YWx0PW1lZGlh"
        }
      ],
      rating: {
        count: 200,
        score: 4.5
      },
      details: {
        units: {
          proteins: "g",
          carbs: "g",
          fats: "g",
          energy: "kJ",
          ca: "mg",
          mg: "mg",
          fe: "mg"
        },
        nutrients: {
          proteins: 22,
          carbs: 13,
          fats: 8,
          ca: 16,
          mg: 20,
          fe: 10
        },
        energy: 774
      },
      preparationTimeMinutes: 25
    };
  });

  it("when calories is not defined return NaN", () => {
    const energy = undefined;
    recipe.details.energy = energy;
    const wrapper = shallowMount(PremiumRecipeCard, {
      localVue,
      propsData: {
        recipe: recipe,
        user: user
      }
    });

    const span = wrapper.findComponent({ ref: "calories" });
    expect(parseInt(span.text())).toBeNaN();
  });

  it("when calories is zero return zero", () => {
    const energy = 0;
    recipe.details.energy = energy;
    const wrapper = shallowMount(PremiumRecipeCard, {
      localVue,
      propsData: {
        recipe: recipe,
        user: user
      }
    });

    const span = wrapper.findComponent({ ref: "calories" });
    expect(parseInt(span.text())).toBe(0);
  });

  it("when calories is not zero return calories", () => {
    const energy = 106;
    recipe.details.energy = energy;
    const wrapper = shallowMount(PremiumRecipeCard, {
      localVue,
      propsData: {
        recipe: recipe,
        user: user
      }
    });

    const span = wrapper.findComponent({ ref: "calories" });
    expect(parseInt(span.text())).toBe(106);
  });

  it("when users setting is KJ, calories should not be retured", () => {
    const energy = 106;
    recipe.details.energy = energy;
    user.energyUnits = "KJ";
    const wrapper = shallowMount(PremiumRecipeCard, {
      localVue,
      propsData: {
        recipe: recipe,
        user: user
      }
    });

    const span = wrapper.findComponent({ ref: "calories" });
    expect(parseInt(span.text())).not.toBe(106);
  });

  it("when users setting is KJ, calories should be converted to KJ", () => {
    const energy = 950;
    recipe.details.energy = energy;
    user.energyUnits = "KJ";
    const wrapper = shallowMount(PremiumRecipeCard, {
      localVue,
      propsData: {
        recipe: recipe,
        user: user
      }
    });

    const span = wrapper.findComponent({ ref: "calories" });
    expect(parseFloat(span.text())).toBe((energy / 1000) * 4.184);
  });
});
