<?php

namespace Database\Seeders;

use App\Models\Baby;
use App\Models\BabyAction;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BabyActionGrowthSeasonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['mail_address' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        $baby = Baby::firstOrCreate(
            ['user_id' => $user->id],
            ['baby_name' => 'ダミーベビー']
        );

        $profiles = [
            '2025-11' => [
                'seed' => 20251101,
                'label' => '成長初期',
                'night_start_hour' => 21,
                'night_hours_min' => 7,
                'night_hours_max' => 8,
                'nap_count_min' => 2,
                'nap_count_max' => 3,
                'nap_minutes_min' => 50,
                'nap_minutes_max' => 90,
                'feed_hours' => [2, 6, 10, 14, 18, 22],
                'milk_min' => 90,
                'milk_max' => 150,
                'meal_hours' => [12],
                'meal_memos' => ['10倍粥', 'にんじん', 'かぼちゃ'],
                'pee_count_min' => 6,
                'pee_count_max' => 7,
                'poo_chance' => 95,
                'mixed_poo_rate' => 10,
                'cry_base' => 24,
            ],
            '2025-12' => [
                'seed' => 20251201,
                'label' => '離乳食前半',
                'night_start_hour' => 20,
                'night_hours_min' => 8,
                'night_hours_max' => 9,
                'nap_count_min' => 2,
                'nap_count_max' => 3,
                'nap_minutes_min' => 45,
                'nap_minutes_max' => 80,
                'feed_hours' => [6, 10, 14, 18, 22],
                'milk_min' => 110,
                'milk_max' => 170,
                'meal_hours' => [8, 18],
                'meal_memos' => ['ほうれん草', 'じゃがいも', '豆腐', 'りんご'],
                'pee_count_min' => 5,
                'pee_count_max' => 7,
                'poo_chance' => 90,
                'mixed_poo_rate' => 15,
                'cry_base' => 20,
            ],
            '2026-01' => [
                'seed' => 20260101,
                'label' => '離乳食中期',
                'night_start_hour' => 20,
                'night_hours_min' => 9,
                'night_hours_max' => 10,
                'nap_count_min' => 2,
                'nap_count_max' => 2,
                'nap_minutes_min' => 45,
                'nap_minutes_max' => 70,
                'feed_hours' => [6, 11, 16, 21],
                'milk_min' => 130,
                'milk_max' => 200,
                'meal_hours' => [8, 13, 19],
                'meal_memos' => ['ブロッコリー', '白身魚', 'バナナ', 'うどん'],
                'pee_count_min' => 5,
                'pee_count_max' => 6,
                'poo_chance' => 85,
                'mixed_poo_rate' => 20,
                'cry_base' => 16,
            ],
            '2026-03' => [
                'seed' => 20260301,
                'label' => '離乳食後期',
                'night_start_hour' => 20,
                'night_hours_min' => 10,
                'night_hours_max' => 11,
                'nap_count_min' => 1,
                'nap_count_max' => 2,
                'nap_minutes_min' => 40,
                'nap_minutes_max' => 65,
                'feed_hours' => [6, 15, 22],
                'milk_min' => 150,
                'milk_max' => 220,
                'meal_hours' => [8, 12, 18],
                'meal_memos' => ['卵黄', '鶏ささみ', '軟飯', 'ヨーグルト'],
                'pee_count_min' => 4,
                'pee_count_max' => 6,
                'poo_chance' => 80,
                'mixed_poo_rate' => 25,
                'cry_base' => 11,
            ],
        ];

        foreach ($profiles as $month => $profile) {
            $this->seedMonth($baby->id, $month, $profile);
        }
    }

    /**
     * @param array<string, mixed> $profile
     */
    private function seedMonth(int $babyId, string $month, array $profile): void
    {
        mt_srand($profile['seed']);

        $periodStart = CarbonImmutable::parse($month . '-01 00:00:00');
        $periodEnd = $periodStart->endOfMonth();

        BabyAction::where('baby_id', $babyId)
            ->whereBetween('start_date', [$periodStart, $periodEnd])
            ->forceDelete();

        $rows = [];
        $day = $periodStart->startOfDay();

        while ($day->lte($periodEnd->startOfDay())) {
            $this->appendSleepActions($rows, $babyId, $day, $profile, $month);
            $this->appendFeedingActions($rows, $babyId, $day, $profile, $month);
            $this->appendMealActions($rows, $babyId, $day, $profile, $month);
            $this->appendExcretionActions($rows, $babyId, $day, $profile, $month);
            $day = $day->addDay();
        }

        BabyAction::insert($rows);
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @param array<string, mixed> $profile
     */
    private function appendSleepActions(array &$rows, int $babyId, CarbonImmutable $day, array $profile, string $month): void
    {
        $nightStart = $day->setTime((int) $profile['night_start_hour'], 0)->addMinutes(mt_rand(-30, 25));
        $nightHours = mt_rand((int) $profile['night_hours_min'], (int) $profile['night_hours_max']);
        $nightEnd = $nightStart->addHours($nightHours)->addMinutes(mt_rand(0, 25));

        $this->addAction(
            $rows,
            $babyId,
            1,
            $nightStart,
            $nightEnd,
            null,
            $this->cryFlag(1, (int) $nightStart->format('H'), (int) $profile['cry_base']),
            "dummy-{$month}: {$profile['label']} 夜睡眠"
        );

        $napCount = mt_rand((int) $profile['nap_count_min'], (int) $profile['nap_count_max']);
        $napBaseHours = [10, 13, 16];
        for ($i = 0; $i < $napCount; $i++) {
            $hour = $napBaseHours[$i] ?? 16;
            $napStart = $day->setTime($hour, 0)->addMinutes(mt_rand(-25, 25));
            $napEnd = $napStart->addMinutes(mt_rand((int) $profile['nap_minutes_min'], (int) $profile['nap_minutes_max']));
            $this->addAction(
                $rows,
                $babyId,
                1,
                $napStart,
                $napEnd,
                null,
                $this->cryFlag(1, (int) $napStart->format('H'), (int) $profile['cry_base']),
                "dummy-{$month}: {$profile['label']} 昼寝"
            );
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @param array<string, mixed> $profile
     */
    private function appendFeedingActions(array &$rows, int $babyId, CarbonImmutable $day, array $profile, string $month): void
    {
        foreach ($profile['feed_hours'] as $hour) {
            $start = $day->setTime((int) $hour, 0)->addMinutes(mt_rand(-20, 20));
            $end = $start->addMinutes(mt_rand(12, 30));
            $milkAmount = mt_rand((int) $profile['milk_min'], (int) $profile['milk_max']);
            $this->addAction(
                $rows,
                $babyId,
                2,
                $start,
                $end,
                $milkAmount,
                $this->cryFlag(2, (int) $start->format('H'), (int) $profile['cry_base']),
                "dummy-{$month}: {$profile['label']} 授乳"
            );
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @param array<string, mixed> $profile
     */
    private function appendMealActions(array &$rows, int $babyId, CarbonImmutable $day, array $profile, string $month): void
    {
        foreach ($profile['meal_hours'] as $index => $hour) {
            $start = $day->setTime((int) $hour, 0)->addMinutes(mt_rand(-20, 20));
            $end = $start->addMinutes(mt_rand(18, 40));
            $memoIndex = ($day->day + $index) % count($profile['meal_memos']);
            $memo = $profile['meal_memos'][$memoIndex];
            $this->addAction(
                $rows,
                $babyId,
                3,
                $start,
                $end,
                null,
                $this->cryFlag(3, (int) $start->format('H'), (int) $profile['cry_base']),
                "dummy-{$month}: {$profile['label']} 食事 {$memo}"
            );
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     * @param array<string, mixed> $profile
     */
    private function appendExcretionActions(array &$rows, int $babyId, CarbonImmutable $day, array $profile, string $month): void
    {
        $peeCount = mt_rand((int) $profile['pee_count_min'], (int) $profile['pee_count_max']);
        for ($i = 0; $i < $peeCount; $i++) {
            $hour = mt_rand(6, 23);
            $start = $day->setTime($hour, 0)->addMinutes(mt_rand(0, 55));
            $end = $start->addMinutes(mt_rand(5, 15));
            $this->addAction(
                $rows,
                $babyId,
                5,
                $start,
                $end,
                null,
                $this->cryFlag(5, (int) $start->format('H'), (int) $profile['cry_base']),
                "dummy-{$month}: {$profile['label']} おしっこ"
            );
        }

        if (mt_rand(1, 100) <= (int) $profile['poo_chance']) {
            $poopHour = mt_rand(8, 20);
            $poopStart = $day->setTime($poopHour, 0)->addMinutes(mt_rand(-20, 20));
            $poopEnd = $poopStart->addMinutes(mt_rand(8, 18));
            $actionType = mt_rand(1, 100) <= (int) $profile['mixed_poo_rate'] ? 6 : 4;
            $memoAction = $actionType === 6 ? 'うんち/おしっこ' : 'うんち';
            $this->addAction(
                $rows,
                $babyId,
                $actionType,
                $poopStart,
                $poopEnd,
                null,
                $this->cryFlag($actionType, (int) $poopStart->format('H'), (int) $profile['cry_base']),
                "dummy-{$month}: {$profile['label']} {$memoAction}"
            );
        }
    }

    /**
     * @param array<int, array<string, mixed>> $rows
     */
    private function addAction(
        array &$rows,
        int $babyId,
        int $action,
        CarbonImmutable $start,
        CarbonImmutable $end,
        ?int $milkAmount,
        bool $cry,
        string $memo
    ): void {
        $rows[] = [
            'baby_id' => $babyId,
            'action' => $action,
            'cry' => $cry,
            'start_date' => $start->format('Y-m-d H:i:s'),
            'end_date' => $end->format('Y-m-d H:i:s'),
            'milk_amount' => $milkAmount,
            'memo' => $memo,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    private function cryFlag(int $action, int $hour, int $baseCry): bool
    {
        $rate = $baseCry;
        if ($action === 2) {
            $rate += 5;
        }
        if ($action === 4 || $action === 6) {
            $rate += 7;
        }
        if ($hour >= 18 && $hour <= 22) {
            $rate += 8;
        }
        return mt_rand(1, 100) <= $rate;
    }
}

