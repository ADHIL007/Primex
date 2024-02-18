export default function reducer(
    state = {
      loginStatus: false,
      SCHOOL_LIST: {},
      USER: '',
      USER_LIST: {},
      REQUESTS: {}, // Updated to an object to store more information
      SCHOOL_COUNT: 0,
      R1: [],
      R2: [],
      R3: [],
      R4: [],
      CurrentSchool: '',
      CurrentSchoolData: [],
      CurrentUserdata :[],
      prevpass :[]
    },
    action,
  ) {
    switch (action.type) {
      case 'LOGIN_STATUS':
        return { ...state, loginStatus: action.payload };
      case 'SCHOOL_COUNT':
        return { ...state, SCHOOL_COUNT: action.payload.count };
      case 'SCHOOL_LIST':
        return { ...state, SCHOOL_LIST: action.payload };
      case 'USER':
        return { ...state, USER: action.payload };
      case 'USER_LIST':
        return { ...state, USER_LIST: action.payload };
      case 'REQUESTS':
        return { ...state, REQUESTS: action.payload.count };
        case 'REQUESTS_REMOVE':
          // Check if REQUESTS is defined and is an array before attempting to modify it
          return {
            ...state,
            REQUESTS: action.payload,
          };

      case 'R1':
        return { ...state, R1: action.payload };
      case 'R2':
        return { ...state, R2: action.payload };
      case 'R3':
        return { ...state, R3: action.payload };
      case 'R4':
        return { ...state, R4: action.payload };
        case 'CURRENT_SCHOOL':
          return { ...state, CurrentSchool: action.payload };
        case 'CURRENT_SCHOOL_DATA':
          return { ...state, CurrentSchoolData: action.payload };
        case 'CURRENT_USER_DATA':
          return { ...state, CurrentUserdata: action.payload };
          case 'PREVPASS':
            return { ...state, prevpass: action.payload };
            case 'PushPrevPass':
              return {
                ...state,
                CurrentSchoolData: {
                  ...state.CurrentSchoolData,
                  prevpass: action.payload
                }
              };

      default:
        return state;
    }
  }
