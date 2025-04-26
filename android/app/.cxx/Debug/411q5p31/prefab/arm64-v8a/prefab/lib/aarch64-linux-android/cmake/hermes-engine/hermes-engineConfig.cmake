if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/danushkaperera/.gradle/caches/8.13/transforms/38e68e2dd6c4acf9e7cfaec45fdd620b/transformed/hermes-android-0.79.1-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/danushkaperera/.gradle/caches/8.13/transforms/38e68e2dd6c4acf9e7cfaec45fdd620b/transformed/hermes-android-0.79.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

