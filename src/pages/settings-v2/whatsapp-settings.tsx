import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { UiText } from "@/components/ui/text";
import UiButton from "@/components/ui/button";

const WhatsAppIllustration = () => (
  <svg
    viewBox="37 45 250 188"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
  >
    <g filter="url(#welcome_svg__a)">
      <rect x="111.5" y="65.07" width="174" height="122" rx="4.276" fill="url(#welcome_svg__b)" fillOpacity="0.3" shapeRendering="crispEdges" />
      <rect x="111.549" y="65.12" width="173.902" height="121.902" rx="4.227" stroke="#232426" strokeOpacity="0.1" strokeWidth="0.098" shapeRendering="crispEdges" />
      <path stroke="#232426" strokeOpacity="0.1" strokeWidth="0.428" d="M122.85 88.693h137.574M122.85 107.086h137.574M122.85 125.479h137.574M122.85 143.87h137.574M122.85 162.263h137.574" />
      <path d="m144.5 142.631 22.071-11.771 20.929-9.29 10.5-15 11.609-7.528h19.238l13.353-6.658 10.52-1.84 8.78-9.974" stroke="#D9D9D9" strokeWidth="1.71" />
    </g>
    <g filter="url(#welcome_svg__c)">
      <rect x="99.5" y="30.07" width="111.222" height="211.86" rx="11.722" fill="#fff" />
      <rect x="99.5" y="30.07" width="111.222" height="211.86" rx="11.722" fill="url(#welcome_svg__d)" />
      <rect x="99.748" y="30.318" width="110.727" height="211.365" rx="11.474" stroke="#232426" strokeOpacity="0.1" strokeWidth="0.495" />
      <rect x="104.847" y="35.02" width="100.528" height="201.96" rx="7.92" fill="#fff" />
      <rect x="113" y="88.07" width="83" height="80" rx="4.84" fill="#232426" fillOpacity="0.1" />
      <path fillRule="evenodd" clipRule="evenodd" d="M145.618 99.314c.709-.38 1.53-.422 2.269-.198 3.07.93 8.738 1.835 13.508.103.771-.28 1.658-.28 2.427.12l16.944 8.822a2.755 2.755 0 0 1 1.317 3.407l-2.601 6.964a2.78 2.78 0 0 1-2.608 1.801h-3.322c-.921 0-1.668.742-1.668 1.658v31.706c0 1.194-.772 2.279-1.966 2.596-6.21 1.65-18.609 3.386-29.978.027-1.16-.343-1.912-1.414-1.912-2.589v-31.74c0-.916-.747-1.658-1.669-1.658h-3.321a2.78 2.78 0 0 1-2.608-1.801l-2.609-6.985a2.754 2.754 0 0 1 1.288-3.392l16.509-8.84Zm1.945.858c-.487-.147-.997-.11-1.417.115l-16.509 8.841a1.651 1.651 0 0 0-.773 2.034l2.609 6.986c.243.65.867 1.081 1.565 1.081h3.321a2.771 2.771 0 0 1 2.781 2.762v31.74a1.58 1.58 0 0 0 1.117 1.53c11.098 3.279 23.27 1.586 29.374-.035.675-.179 1.14-.801 1.14-1.529v-31.706a2.771 2.771 0 0 1 2.781-2.762h3.322c.698 0 1.322-.431 1.564-1.081l2.602-6.964a1.654 1.654 0 0 0-.79-2.044l-16.945-8.822c-.451-.235-1.006-.252-1.528-.062-5.101 1.853-11.047.876-14.214-.084Z" fill="#fff" />
      <path d="m143.515 100.448 2.53-1.468c8.655 4.124 14.025.979 16.511 0l2.929 1.468c-9.187 6.191-18.242 2.449-21.97 0Z" fill="url(#welcome_svg__e)" fillOpacity="0.3" />
      <path d="m173.846 120.169 4.857-12.506 3.119 2.084-3.778 10.005-4.198.417Z" fill="url(#welcome_svg__f)" fillOpacity="0.3" />
      <path d="m136.065 120.169-4.478-12.506-3.918 2.175 3.359 9.498 5.037.833Z" fill="url(#welcome_svg__g)" fillOpacity="0.3" />
      <path fillRule="evenodd" clipRule="evenodd" d="M145.618 99.314c.709-.38 1.53-.422 2.269-.198 3.07.93 8.738 1.835 13.508.103.771-.28 1.658-.28 2.427.12l16.944 8.822a2.755 2.755 0 0 1 1.317 3.407l-2.601 6.964a2.78 2.78 0 0 1-2.608 1.801h-3.322c-.921 0-1.668.742-1.668 1.658v31.706c0 1.194-.772 2.279-1.966 2.596-6.21 1.65-18.609 3.386-29.978.027-1.16-.343-1.912-1.414-1.912-2.589v-31.74c0-.916-.747-1.658-1.669-1.658h-3.321a2.78 2.78 0 0 1-2.608-1.801l-2.609-6.985a2.754 2.754 0 0 1 1.288-3.392l16.509-8.84Zm1.945.858c-.487-.147-.997-.11-1.417.115l-16.509 8.841a1.651 1.651 0 0 0-.773 2.034l2.609 6.986c.243.65.867 1.081 1.565 1.081h3.321a2.771 2.771 0 0 1 2.781 2.762v31.74a1.58 1.58 0 0 0 1.117 1.53c11.098 3.279 23.27 1.586 29.374-.035.675-.179 1.14-.801 1.14-1.529v-31.706a2.771 2.771 0 0 1 2.781-2.762h3.322c.698 0 1.322-.431 1.564-1.081l2.602-6.964a1.654 1.654 0 0 0-.79-2.044l-16.945-8.822c-.451-.235-1.006-.252-1.528-.062-5.101 1.853-11.047.876-14.214-.084Z" fill="#fff" />
      <path fillRule="evenodd" clipRule="evenodd" d="M155.5 129.08a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm1.149-9.199-.839-2.576a.326.326 0 0 0-.62 0l-.839 2.576a.325.325 0 0 1-.31.224h-2.715a.325.325 0 0 0-.191.588l2.196 1.592c.115.083.162.23.119.364l-.839 2.576c-.098.299.246.548.501.363l2.196-1.592a.327.327 0 0 1 .384 0l2.196 1.592c.255.185.599-.064.501-.363l-.839-2.576a.326.326 0 0 1 .119-.364l2.196-1.592a.325.325 0 0 0-.191-.588h-2.715a.325.325 0 0 1-.31-.224Z" fill="#232426" fillOpacity="0.08" />
      <circle cx="155" cy="50.57" r="6.5" fill="#232426" fillOpacity="0.08" />
      <path d="M145.5 62.006c0-.6.487-1.088 1.088-1.088h16.961a1.088 1.088 0 1 1 0 2.177h-16.961a1.088 1.088 0 0 1-1.088-1.089Z" fill="#232426" fillOpacity="0.08" />
    </g>
    <g filter="url(#welcome_svg__h)">
      <path d="M54 89.62v6.36" stroke="#232426" strokeOpacity="0.2" strokeWidth="0.6" />
      <circle cx="54" cy="97.571" r="1.89" stroke="#232426" strokeOpacity="0.2" strokeWidth="0.6" />
      <path d="M54 99.161v6.361M54 126.62v6.361" stroke="#232426" strokeOpacity="0.2" strokeWidth="0.6" />
      <circle cx="54" cy="134.571" r="1.89" stroke="#232426" strokeOpacity="0.2" strokeWidth="0.6" />
      <path d="M54 136.161v6.361" stroke="#232426" strokeOpacity="0.2" strokeWidth="0.6" />
      <g clipPath="url(#welcome_svg__i)" stroke="#232426" strokeWidth="0.6">
        <path d="M54 107.62v6.361" />
        <circle cx="54" cy="115.571" r="1.89" />
        <path d="M54 117.16v6.361" />
      </g>
      <rect x="44.5" y="142.07" width="19.413" height="7.765" rx="3.883" fill="#fff" />
      <rect x="40.5" y="68.07" width="101" height="24" rx="2.064" fill="#fff" />
      <path fillRule="evenodd" clipRule="evenodd" d="m56.177 75.755-4.116 5 3.747-.002-.976 3.695 4.27-4.93-3.904-.016.979-3.746Zm-.11-1.703c.606-.737 1.809-.146 1.57.771l-.923 3.53 2.993.014c.764.003 1.176.88.681 1.45l-5.447 6.288c-.617.713-1.794.115-1.555-.79l.9-3.407-2.808.002c-.756 0-1.175-.857-.7-1.433l5.288-6.425Z" fill="#BBC7B6" />
      <rect x="64.071" y="78.07" width="51" height="4" rx="2" fill="#BBC7B6" />
      <rect x="40.5" y="103.07" width="74.205" height="23.852" rx="2.064" fill="#fff" />
      <g clipPath="url(#welcome_svg__j)">
        <path fillRule="evenodd" clipRule="evenodd" d="M60.94 110.001a6.928 6.928 0 0 0-4.93-2.044c-3.843 0-6.97 3.127-6.971 6.97 0 1.229.32 2.428.93 3.485l-.989 3.613 3.696-.97a6.965 6.965 0 0 0 3.33.849h.004c3.842 0 6.97-3.128 6.97-6.971a6.926 6.926 0 0 0-2.04-4.931v-.001Zm-4.93 10.725h-.002a5.78 5.78 0 0 1-2.95-.807l-.211-.126-2.193.575.585-2.138-.137-.219a5.781 5.781 0 0 1-.886-3.083 5.803 5.803 0 0 1 5.796-5.794 5.754 5.754 0 0 1 4.096 1.7 5.754 5.754 0 0 1 1.696 4.098 5.802 5.802 0 0 1-5.794 5.794Zm3.178-4.339c-.174-.087-1.03-.508-1.19-.566-.16-.058-.276-.088-.392.087-.116.174-.45.567-.552.683-.101.116-.203.13-.377.043-.174-.087-.735-.271-1.4-.864a5.24 5.24 0 0 1-.97-1.207c-.101-.174-.01-.268.076-.355.079-.078.175-.204.262-.305.087-.102.116-.175.174-.291.058-.116.03-.218-.014-.305s-.392-.944-.538-1.293c-.14-.34-.285-.293-.391-.299a7.059 7.059 0 0 0-.334-.006.637.637 0 0 0-.465.218c-.16.174-.61.596-.61 1.453 0 .857.625 1.685.712 1.802.087.116 1.228 1.875 2.975 2.63.416.179.74.287.993.367.418.132.797.114 1.097.069.335-.05 1.03-.422 1.176-.828.145-.407.145-.756.101-.829-.043-.072-.16-.116-.334-.203v-.001Z" fill="#232426" />
      </g>
      <rect x="68.981" y="112.996" width="24" height="4" rx="2" fill="#ACB0B4" />
    </g>
    <g filter="url(#welcome_svg__k)">
      <path d="M258.933 147.769c0-3.699-2.569-6.699-5.738-6.699h-95.957c-3.169 0-5.738 3-5.738 6.699v55.861c0 3.7 2.569 6.699 5.738 6.699h95.957c3.169 0 5.738-2.896 5.738-6.596v-55.964Z" fill="#fff" />
      <path d="m258.933 219.07-8.645-8.74 4.525-8.474h4.12v17.214Z" fill="#fff" />
      <path d="M209.673 168.259v-8.633h-.134l-2.639 1.834v-2.028l2.781-1.931h2.244v10.758h-2.252Zm9.472.276c-.885 0-1.647-.229-2.289-.686-.636-.462-1.125-1.116-1.468-1.961-.343-.845-.515-1.846-.515-3.005v-.014c0-1.163.172-2.165.515-3.005.343-.845.832-1.496 1.468-1.953.642-.457 1.404-.686 2.289-.686.89 0 1.653.229 2.289.686.636.457 1.126 1.108 1.469 1.953.343.84.514 1.842.514 3.005v.014c0 1.159-.171 2.16-.514 3.005-.343.845-.833 1.499-1.469 1.961-.636.457-1.399.686-2.289.686Zm0-1.782c.428 0 .788-.154 1.081-.462.298-.309.525-.751.679-1.327.159-.577.238-1.27.238-2.081v-.014c0-.816-.079-1.509-.238-2.08-.154-.577-.381-1.017-.679-1.32a1.433 1.433 0 0 0-1.081-.462 1.45 1.45 0 0 0-1.081.462c-.293.303-.519.743-.678 1.32-.154.571-.231 1.264-.231 2.08v.014c0 .811.077 1.504.231 2.081.159.576.385 1.018.678 1.327a1.45 1.45 0 0 0 1.081.462Zm8.876-3.355c-.786 0-1.407-.271-1.864-.813-.452-.546-.679-1.285-.679-2.214v-.007c0-.935.227-1.67.679-2.207.457-.542 1.078-.813 1.864-.813.79 0 1.411.271 1.863.813.453.537.679 1.272.679 2.207v.007c0 .929-.226 1.668-.679 2.214-.452.542-1.073.813-1.863.813Zm0-1.193c.328 0 .579-.159.753-.477.179-.318.268-.77.268-1.357v-.007c0-.592-.089-1.044-.268-1.357-.174-.313-.425-.47-.753-.47-.323 0-.574.157-.753.47-.174.313-.261.765-.261 1.357v.007c0 .587.087 1.039.261 1.357.179.318.43.477.753.477Zm1.655 6.054h-1.722l7.239-10.758h1.722l-7.239 10.758Zm7.164.156c-.785 0-1.406-.271-1.864-.812-.452-.547-.678-1.285-.678-2.215v-.007c0-.934.226-1.67.678-2.207.458-.542 1.079-.812 1.864-.812.791 0 1.412.27 1.864.812.452.537.679 1.273.679 2.207v.007c0 .93-.227 1.668-.679 2.215-.452.541-1.073.812-1.864.812Zm0-1.193c.328 0 .579-.159.753-.477.179-.318.269-.77.269-1.357v-.007c0-.591-.09-1.044-.269-1.357-.174-.313-.425-.47-.753-.47-.323 0-.574.157-.753.47-.174.313-.261.766-.261 1.357v.007c0 .587.087 1.039.261 1.357.179.318.43.477.753.477Z" fill="#D9D9D9" />
      <circle cx="183.141" cy="165.353" r="15.453" fill="#BBC7B6" />
      <path fill="#BBC7B6" d="M172.104 154.316h22.076v22.076h-22.076z" />
      <path d="M181.265 163.478a1.38 1.38 0 1 0-1.95-1.951 1.38 1.38 0 0 0 1.95 1.951Z" fill="#fff" />
      <path fillRule="evenodd" clipRule="evenodd" d="m182.035 155.764-6.727 1.757-1.757 6.727a3.678 3.678 0 0 0 .959 3.531l6.43 6.43a3.679 3.679 0 0 0 5.203 0l5.854-5.853a3.68 3.68 0 0 0 0-5.204l-6.431-6.43a3.68 3.68 0 0 0-3.531-.958Zm-6.704 8.949 1.485-5.685 5.684-1.484a1.84 1.84 0 0 1 1.766.479l6.43 6.43a1.84 1.84 0 0 1 0 2.602l-5.854 5.854a1.84 1.84 0 0 1-2.601 0l-6.431-6.431a1.84 1.84 0 0 1-.479-1.765Z" fill="#fff" />
      <path d="M167.205 188.7c0-1.109.899-2.008 2.008-2.008h64.244a2.008 2.008 0 0 1 0 4.016h-64.244a2.008 2.008 0 0 1-2.008-2.008ZM167.205 197.734c0-1.109.899-2.007 2.008-2.007h59.225a2.008 2.008 0 0 1 0 4.015h-59.225a2.008 2.008 0 0 1-2.008-2.008Z" fill="#BBC7B6" />
    </g>
    <defs>
      <radialGradient id="welcome_svg__b" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(40.42 -114.71 300.56) scale(241.43 212.052)">
        <stop offset="0.2" stopColor="#fff" />
        <stop offset="0.814" stopColor="#EEE" />
      </radialGradient>
      <radialGradient id="welcome_svg__d" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(520.96206 329.74975 -198.76056 314.01604 -38.09 111.483)">
        <stop offset="0.136" stopColor="#fff" />
        <stop offset="0.44" stopColor="#F6F6F6" />
      </radialGradient>
      <radialGradient id="welcome_svg__e" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(15.006 -312.7 622.78) scale(24.0277 10.692)">
        <stop offset="0.2" stopColor="#fff" />
        <stop offset="0.814" stopColor="#EEE" />
      </radialGradient>
      <radialGradient id="welcome_svg__f" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(8.42524 16.04698 -11.75171 6.17007 176.413 115.971)">
        <stop offset="0.2" stopColor="#fff" />
        <stop offset="0.814" stopColor="#EEE" />
      </radialGradient>
      <radialGradient id="welcome_svg__g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(61.072 -33.113 168.49) scale(18.3346 13.8113)">
        <stop offset="0.2" stopColor="#fff" />
        <stop offset="0.814" stopColor="#EEE" />
      </radialGradient>
      <filter id="welcome_svg__a" x="107.5" y="63.07" width="182" height="130" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.137255 0 0 0 0 0.141176 0 0 0 0 0.14902 0 0 0 0.12 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="effect1_dropShadow_7311_266730" result="effect2_dropShadow_7311_266730" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_7311_266730" result="shape" />
      </filter>
      <filter id="welcome_svg__c" x="94.764" y="30.07" width="120.694" height="221.332" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4.736" />
        <feGaussianBlur stdDeviation="2.368" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7311_266730" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_7311_266730" result="shape" />
      </filter>
      <filter id="welcome_svg__h" x="37.881" y="65.127" width="126.369" height="99.235" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="0.648" dy="0.486" />
        <feGaussianBlur stdDeviation="1.629" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.0627451 0 0 0 0 0.0784314 0 0 0 0.18 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="2.268" dy="1.944" />
        <feGaussianBlur stdDeviation="2.444" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.0627451 0 0 0 0 0.0784314 0 0 0 0.15 0" />
        <feBlend in2="effect1_dropShadow_7311_266730" result="effect2_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="5.184" dy="4.374" />
        <feGaussianBlur stdDeviation="2.851" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.0627451 0 0 0 0 0.0784314 0 0 0 0.09 0" />
        <feBlend in2="effect2_dropShadow_7311_266730" result="effect3_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="9.234" dy="7.776" />
        <feGaussianBlur stdDeviation="3.258" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.0627451 0 0 0 0 0.0784314 0 0 0 0.03 0" />
        <feBlend in2="effect3_dropShadow_7311_266730" result="effect4_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.054902 0 0 0 0 0.0627451 0 0 0 0 0.0784314 0 0 0 0.02 0" />
        <feBlend in2="effect4_dropShadow_7311_266730" result="effect5_dropShadow_7311_266730" />
        <feBlend in="SourceGraphic" in2="effect5_dropShadow_7311_266730" result="shape" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="0.07" />
        <feGaussianBlur stdDeviation="1.391" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix values="0 0 0 0 0.890196 0 0 0 0 0.870588 0 0 0 0 1 0 0 0 0.1 0" />
        <feBlend in2="shape" result="effect6_innerShadow_7311_266730" />
      </filter>
      <filter id="welcome_svg__k" x="147.5" y="139.07" width="115.434" height="86" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.137255 0 0 0 0 0.141176 0 0 0 0 0.14902 0 0 0 0.12 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7311_266730" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="effect1_dropShadow_7311_266730" result="effect2_dropShadow_7311_266730" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_7311_266730" result="shape" />
      </filter>
      <clipPath id="welcome_svg__i">
        <path fill="#fff" transform="translate(48.5 110.07)" d="M0 0h11v11H0z" />
      </clipPath>
      <clipPath id="welcome_svg__j">
        <path fill="#fff" transform="translate(48.98 107.957)" d="M0 0h14v14.078H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const WhatsAppSettings = () => {
  return (
    <Box w="full" display="flex" justifyContent="center">
      <Box maxW="960px" w="full" pt="8">
        <Flex align="center" gap={20} w="full">
          {/* Left: text content */}
          <Box flex="1" minW="0">
            <UiText
              variant="heading"
              fontSize="3xl"
              fontWeight="medium"
              lineHeight="shorter"
              color="black"
              mb={5}
            >
              Turn conversations into customers with WhatsApp
            </UiText>

            <UiText variant="body" color="gray.400" mb={3}>
              Adding WhatsApp to your business unlocks higher engagement and
              measurable ROI across your flows and campaigns.
            </UiText>

            <UiText variant="body" color="gray.400" mb={7}>
              With billions of active users worldwide, WhatsApp helps you hit
              your goals and scale growth. A recent study shows that business
              messages on WhatsApp achieve open rates as high as 98%.
            </UiText>

            <HStack gap={3} mb={4}>
              <UiButton uiVariant="solid">Begin WhatsApp setup</UiButton>
              <UiButton uiVariant="outline">
                <HStack gap={1.5} align="center">
                  <span>View pricing</span>
                  <ExternalLink size={14} />
                </HStack>
              </UiButton>
            </HStack>

            <Link
              href="#"
              color="blue.200"
              fontSize="md"
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              _hover={{ textDecoration: "underline" }}
            >
              Learn more about using WhatsApp for your business
              <ExternalLink size={14} />
            </Link>
          </Box>

          {/* Right: illustration */}
          <Box flexShrink={0} w="350px" h="350px">
            <WhatsAppIllustration />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
