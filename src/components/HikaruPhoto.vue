<script>

// import TripleSharpArrows from "./Stylistic/TripleSharpArrows.vue";
// import TripleHollowArrows from "./Stylistic/TripleHollowArrows.vue";
// import TripleThinArrows from "./Stylistic/TripleThinArrows.vue";
// import { ReactComponent as DotsArray } from "./svg/dotsArray.svg";
// import { ReactComponent as LShape } from "./svg/lShaped.svg";
// import { ReactComponent as LShape2 } from "./svg/lShaped2.svg";
</script>

<template>
    <div class="relative scale-75 mb-32">
        <img class="max-w-xs" src="../assets/images/Hikaru.jpg" alt="Hikaru Nakamura" />
        <div class="absolute -rotate-90 -left-32 -bottom-14 scale-x-110">
            <TripleHollowArrows />
        </div>
        <div class="absolute -rotate-90 -left-44 bottom-40 scale-[2.5] scale-x-[3]">
            <TripleSharpArrows />
        </div>
        <div class="absolute -rotate-90 -right-20 bottom-0 scale-[2]">
            <TripleThinArrows />
        </div>
        <div class="absolute -z-10 scale-[0.15] -bottom-[29rem] -right-[37rem]">
            <DotsArray class="stroke-white fill-white stroke-0" />
        </div>
        <div class="absolute -left-12 -bottom-12 -rotate-90 opacity-80">
            <LShape class="stroke-white fill-white" />
        </div>
        <div class="absolute -right-9 -top-9 rotate-90 opacity-80">
            <LShape2 class="stroke-white fill-white" />
        </div>
        <p
            class="absolute text-[9px] font-AguafinaScript text-slate-200 z-20 left-48 -bottom-48 w-64 tracking-widest text-center lowercase leading-3 opacity-100">
            Hikaru Nakamura (born December 9, 1987) is an American chess grandmaster and streamer. A chess prodigy, he
            was at the time the youngest American to earn the title of Grandmaster in 2003,
            <br />
            <br />
            aged 15 years and 79 days. Nakamura is a five-time United States champion.[2] He won the 2011 edition of
            Tata Steel Chess Tournament Group A and represented the United States at five Chess Olympiads, winning a
            team gold medal and two team bronze medals.
            <br />
            <br />
            Hikaru Nakamura was born in Hirakata, Osaka Prefecture, Japan, to an American mother, Carolyn Merrow
            Nakamura, a classically trained musician and former public school teacher, and a Japanese father, Shuichi
            Nakamura.[6][7] Nakamura has an older brother, Asuka.
        </p>
    </div>
</template>
